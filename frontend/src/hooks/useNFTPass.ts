"use client";

import { useState, useEffect } from "react";
import type { NFTMetadata } from "@/types/nft";
import { checkNFTOwnership, getNFTMetadata } from "@/lib/nft";

export function useNFTPass(contractId: string | null, holderAddress: string | null) {
  const [hasPass, setHasPass] = useState(false);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!contractId || !holderAddress) {
      setHasPass(false);
      setMetadata(null);
      return;
    }

    let cancelled = false;

    async function check() {
      setIsLoading(true);
      try {
        const owns = await checkNFTOwnership(contractId!, holderAddress!);
        if (!cancelled) {
          setHasPass(owns);
          if (owns) {
            const meta = await getNFTMetadata(contractId!, holderAddress!);
            if (!cancelled) setMetadata(meta);
          }
        }
      } catch {
        if (!cancelled) {
          setHasPass(false);
          setMetadata(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    check();

    return () => {
      cancelled = true;
    };
  }, [contractId, holderAddress]);

  return { hasPass, metadata, isLoading };
}
