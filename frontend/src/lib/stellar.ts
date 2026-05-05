import * as StellarSdk from "@stellar/stellar-sdk";
import * as rpc from "@stellar/stellar-sdk/rpc";

// ---------------------------------------------------------------------------
// Network configuration – Stellar Testnet + Soroban RPC
// ---------------------------------------------------------------------------

export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
export const SOROBAN_RPC_URL =
  process.env.NEXT_PUBLIC_SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org";
export const HORIZON_URL =
  process.env.NEXT_PUBLIC_HORIZON_URL ?? "https://horizon-testnet.stellar.org";

/** Factory contract address – set via env var after deployment */
export const FACTORY_CONTRACT_ID =
  process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ID ?? "";

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export function getSorobanServer(): rpc.Server {
  return new rpc.Server(SOROBAN_RPC_URL);
}

// ---------------------------------------------------------------------------
// Contract invocation helpers
// ---------------------------------------------------------------------------

/**
 * Build a Soroban contract call transaction (unsigned).
 * Caller is expected to sign via Freighter and submit.
 */
export async function buildContractCall(
  contractId: string,
  method: string,
  args: StellarSdk.xdr.ScVal[],
  callerPublicKey: string,
): Promise<StellarSdk.Transaction> {
  const server = getSorobanServer();
  const account = await server.getAccount(callerPublicKey);

  const contract = new StellarSdk.Contract(contractId);

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: "100000",
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(120)
    .build();

  // Simulate to get the authorisation + resource footprint
  const simulated = await server.simulateTransaction(tx);

  if (rpc.Api.isSimulationError(simulated)) {
    throw new Error(`Simulation failed: ${JSON.stringify(simulated)}`);
  }

  const prepared = rpc.assembleTransaction(
    tx,
    simulated,
  ).build();

  return prepared;
}

/**
 * Submit a signed transaction XDR to the Soroban RPC.
 * Waits for confirmation with exponential back-off.
 */
export async function submitTransaction(
  signedXdr: string,
): Promise<rpc.Api.GetTransactionResponse> {
  const server = getSorobanServer();
  const tx = StellarSdk.TransactionBuilder.fromXDR(
    signedXdr,
    NETWORK_PASSPHRASE,
  );

  const sendResponse = await server.sendTransaction(tx);

  if (sendResponse.status === "ERROR") {
    throw new Error(`Transaction send failed: ${JSON.stringify(sendResponse)}`);
  }

  // Poll for completion
  let getResponse: rpc.Api.GetTransactionResponse;
  let attempts = 0;
  do {
    await new Promise((r) => setTimeout(r, 1500 * Math.pow(1.5, attempts)));
    getResponse = await server.getTransaction(sendResponse.hash);
    attempts++;
  } while (
    getResponse.status === rpc.Api.GetTransactionStatus.NOT_FOUND &&
    attempts < 20
  );

  return getResponse;
}

// ---------------------------------------------------------------------------
// Read-only helpers (no signing required)
// ---------------------------------------------------------------------------

export async function readContractValue(
  contractId: string,
  method: string,
  args: StellarSdk.xdr.ScVal[] = [],
): Promise<StellarSdk.xdr.ScVal | undefined> {
  const server = getSorobanServer();

  // Use a throw-away source account for simulation-only calls
  const zeroKey = "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF";
  let account: StellarSdk.Account;
  try {
    account = await server.getAccount(zeroKey);
  } catch {
    // Fallback: create a virtual account
    account = new StellarSdk.Account(zeroKey, "0");
  }

  const contract = new StellarSdk.Contract(contractId);
  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: "100000",
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build();

  const sim = await server.simulateTransaction(tx);

  if (rpc.Api.isSimulationError(sim)) {
    throw new Error(`Read failed: ${JSON.stringify(sim)}`);
  }

  if ("result" in sim && sim.result) {
    return sim.result.retval;
  }

  return undefined;
}
