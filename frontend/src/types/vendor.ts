/** Vendor listing for event marketplace */
export interface Vendor {
  id: string;
  name: string;
  description: string;
  category: "food" | "merch" | "drinks" | "services";
  price: number;
  eventId: number;
  walletAddress: string;
  imageUrl?: string;
}
