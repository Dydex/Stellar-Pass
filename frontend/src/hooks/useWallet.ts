"use client";

import { useState, useCallback, useEffect } from "react";
import {
  isFreighterConnected,
  requestFreighterAccess,
  getFreighterPublicKey,
} from "@/lib/wallet";

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useWallet(): WalletState {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for existing connection on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const connected = await isFreighterConnected();
        if (connected && !cancelled) {
          const pubKey = await getFreighterPublicKey();
          setAddress(pubKey);
          setIsConnected(true);
        }
      } catch {
        // Freighter not installed – silently ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const connect = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const pubKey = await requestFreighterAccess();
      setAddress(pubKey);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setError(null);
  }, []);

  return { address, isConnected, isLoading, error, connect, disconnect };
}
