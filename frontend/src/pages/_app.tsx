import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EventMesh — On-Chain Event Ticketing &amp; NFT Passes on Stellar</title>
        <meta
          name="description"
          content="Discover events, buy tickets, and receive soulbound NFT attendance passes — all powered by Soroban smart contracts on the Stellar network."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
