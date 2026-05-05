import { NETWORK_PASSPHRASE } from "./stellar";

// ---------------------------------------------------------------------------
// Freighter Wallet integration
// ---------------------------------------------------------------------------

/** Check whether Freighter extension is available in the browser */
export function isFreighterAvailable(): boolean {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof (window as any).freighterApi !== "undefined";
}

/** Request the user's public key from Freighter */
export async function getFreighterPublicKey(): Promise<string> {
  const freighterApi = await import("@stellar/freighter-api");
  const { address } = await freighterApi.getAddress();
  return address;
}

/** Check if the user has already granted access */
export async function isFreighterConnected(): Promise<boolean> {
  try {
    const freighterApi = await import("@stellar/freighter-api");
    const { isConnected } = await freighterApi.isConnected();
    return isConnected;
  } catch {
    return false;
  }
}

/** Sign a transaction XDR using Freighter and return the signed XDR */
export async function signWithFreighter(txXdr: string): Promise<string> {
  const freighterApi = await import("@stellar/freighter-api");
  const { signedTxXdr } = await freighterApi.signTransaction(txXdr, {
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  return signedTxXdr;
}

/** Request access (prompts the Freighter popup) */
export async function requestFreighterAccess(): Promise<string> {
  const freighterApi = await import("@stellar/freighter-api");
  const { address } = await freighterApi.requestAccess();
  return address;
}
