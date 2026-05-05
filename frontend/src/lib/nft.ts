import * as StellarSdk from "@stellar/stellar-sdk";
import { readContractValue } from "./stellar";
import type { NFTMetadata } from "@/types/nft";

// ---------------------------------------------------------------------------
// NFT contract read helpers
// ---------------------------------------------------------------------------

/** Check whether `holder` owns a soulbound NFT on `contractId` */
export async function checkNFTOwnership(
  contractId: string,
  holder: string,
): Promise<boolean> {
  try {
    const val = await readContractValue(contractId, "holds_nft", [
      new StellarSdk.Address(holder).toScVal(),
    ]);
    if (!val) return false;
    return val.switch().name === "scvBool" && val.b();
  } catch {
    return false;
  }
}

/** Fetch NFT metadata for `holder` on `contractId` */
export async function getNFTMetadata(
  contractId: string,
  holder: string,
): Promise<NFTMetadata | null> {
  try {
    const val = await readContractValue(contractId, "get_nft", [
      new StellarSdk.Address(holder).toScVal(),
    ]);
    if (!val) return null;

    // Decode the struct fields from ScVal
    const fields = val.map();
    const fieldMap = new Map<string, string>();
    if (fields) {
      for (const entry of fields) {
        const key = entry.key().sym().toString();
        const value = entry.val();
        if (value.switch().name === "scvString") {
          fieldMap.set(key, value.str().toString());
        } else if (value.switch().name === "scvAddress") {
          fieldMap.set(key, StellarSdk.Address.fromScVal(value).toString());
        }
      }
    }

    return {
      event_name: fieldMap.get("event_name") ?? "",
      location: fieldMap.get("location") ?? "",
      owner: fieldMap.get("owner") ?? "",
      event_details: fieldMap.get("event_details") ?? "",
    };
  } catch {
    return null;
  }
}

/** Fetch total supply for an NFT contract */
export async function getNFTTotalSupply(contractId: string): Promise<number> {
  try {
    const val = await readContractValue(contractId, "total_supply");
    if (!val) return 0;
    return val.u32();
  } catch {
    return 0;
  }
}
