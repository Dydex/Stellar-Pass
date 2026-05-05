/** Mirrors the EventMeshNFT contract's NFTMetadata struct */
export interface NFTMetadata {
  event_name: string;
  location: string;
  owner: string;
  event_details: string;
}

/** NFT pass with associated contract info */
export interface NFTPass extends NFTMetadata {
  contractId: string;
  eventIndex: number;
}
