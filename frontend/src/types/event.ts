/** Mirrors the Factory contract's EventInfo struct */
export interface EventInfo {
  nft_contract: string;
  owner: string;
  name: string;
  location: string;
  details: string;
}

/** Extended event type with on-chain index and live stats */
export interface EventOnChain extends EventInfo {
  index: number;
  ticketsSold: number;
  totalSupply: number;
}
