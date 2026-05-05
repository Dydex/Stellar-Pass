import * as StellarSdk from "@stellar/stellar-sdk";
import * as rpc from "@stellar/stellar-sdk/rpc";
import { buildContractCall, submitTransaction } from "./stellar";
import { signWithFreighter } from "./wallet";

// ---------------------------------------------------------------------------
// Ticket purchase flow
// ---------------------------------------------------------------------------

export interface BuyTicketResult {
  success: boolean;
  hash?: string;
  error?: string;
}

/**
 * Full buy-ticket flow:
 * 1. Build contract call → Event.buy_ticket(buyer, recipient)
 * 2. Sign with Freighter
 * 3. Submit to Soroban RPC
 */
export async function buyTicket(
  eventContractId: string,
  buyerPublicKey: string,
  recipientPublicKey?: string,
): Promise<BuyTicketResult> {
  try {
    const recipient = recipientPublicKey ?? buyerPublicKey;

    const tx = await buildContractCall(
      eventContractId,
      "buy_ticket",
      [
        new StellarSdk.Address(buyerPublicKey).toScVal(),
        new StellarSdk.Address(recipient).toScVal(),
      ],
      buyerPublicKey,
    );

    const signedXdr = await signWithFreighter(tx.toXDR());
    const result = await submitTransaction(signedXdr);

    if (result.status === rpc.Api.GetTransactionStatus.SUCCESS) {
      return { success: true, hash: "txHash" in result ? String(result) : undefined };
    }

    return { success: false, error: `Transaction status: ${result.status}` };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
