"use client";

import { useState, useEffect } from "react";
import type { EventOnChain } from "@/types/event";

// ---------------------------------------------------------------------------
// Mock data – used until Factory contract is deployed on testnet
// ---------------------------------------------------------------------------

const MOCK_EVENTS: EventOnChain[] = [
  {
    index: 0,
    name: "Meridian 2026",
    location: "San Francisco",
    details:
      "Stellar's flagship conference — three days of workshops, keynotes, and builder sessions exploring the future of finance on the Stellar network.",
    owner: "GBZX…MOCK",
    nft_contract: "CAAAA…NFT0",
    ticketsSold: 142,
    totalSupply: 142,
  },
  {
    index: 1,
    name: "Soroban Hackathon Lagos",
    location: "Lagos",
    details:
      "48-hour hackathon building real-world Soroban smart contracts. Prizes in XLM and mentorship from core protocol engineers.",
    owner: "GCYX…MOCK",
    nft_contract: "CAAAA…NFT1",
    ticketsSold: 87,
    totalSupply: 87,
  },
  {
    index: 2,
    name: "Web3 Music Fest Berlin",
    location: "Berlin",
    details:
      "A three-night music festival where every ticket is a soulbound NFT. Featuring DJs, live acts, and on-chain merch drops.",
    owner: "GDKL…MOCK",
    nft_contract: "CAAAA…NFT2",
    ticketsSold: 534,
    totalSupply: 534,
  },
  {
    index: 3,
    name: "DeFi Summit Singapore",
    location: "Singapore",
    details:
      "Deep-dive into decentralized finance on Stellar — AMMs, lending protocols, and cross-border payment rails.",
    owner: "GBNM…MOCK",
    nft_contract: "CAAAA…NFT3",
    ticketsSold: 210,
    totalSupply: 210,
  },
  {
    index: 4,
    name: "Stellar Community Meetup NYC",
    location: "New York",
    details:
      "Monthly community gathering for Stellar builders. Lightning talks, networking, and pizza.",
    owner: "GAQZ…MOCK",
    nft_contract: "CAAAA…NFT4",
    ticketsSold: 45,
    totalSupply: 45,
  },
  {
    index: 5,
    name: "NFT Art Exhibition Tokyo",
    location: "Tokyo",
    details:
      "A curated exhibition blending physical art installations with soulbound NFT attendance tokens on Stellar.",
    owner: "GHIJ…MOCK",
    nft_contract: "CAAAA…NFT5",
    ticketsSold: 320,
    totalSupply: 320,
  },
];

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useEvents() {
  const [events, setEvents] = useState<EventOnChain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchEvents() {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with on-chain Factory reads once deployed
        // const factoryId = FACTORY_CONTRACT_ID;
        // const countVal = await readContractValue(factoryId, "event_count");
        // const count = countVal?.u32() ?? 0;
        // ... fetch each event by index ...

        // Simulate network latency
        await new Promise((r) => setTimeout(r, 600));

        if (!cancelled) {
          setEvents(MOCK_EVENTS);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load events");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return { events, isLoading, error };
}

export function useEvent(index: number) {
  const { events, isLoading, error } = useEvents();
  const event = events.find((e) => e.index === index) ?? null;
  return { event, isLoading, error };
}
