/** Truncate a Stellar address for display: GABC…WXYZ */
export function truncateAddress(address: string, chars = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2 + 1) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

/** Format stroops (1/10_000_000 XLM) to a human-readable XLM string */
export function formatXLM(stroops: number | bigint): string {
  const xlm = Number(stroops) / 10_000_000;
  return `${xlm.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 })} XLM`;
}

/** Format a token amount with decimals */
export function formatToken(amount: number | bigint, decimals = 7, symbol = "XLM"): string {
  const value = Number(amount) / Math.pow(10, decimals);
  return `${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
}

/** Generate a deterministic pastel gradient from a string (for event cards) */
export function hashGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 80%, 65%), hsl(${h2}, 90%, 55%))`;
}

/** Delay helper for async flows */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Class name helper – filters out falsy values and joins */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
