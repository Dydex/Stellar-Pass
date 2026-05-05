# EventMesh

EventMesh is a decentralized event ticketing and vendor marketplace protocol built on the Stellar network. It uses Soroban smart contracts to handle ticket purchases, mint soulbound NFT attendance passes, and process vendor payments — all settled on-chain with near-instant finality and minimal fees.

Organizers create events and configure NFT ticketing parameters. Attendees buy tickets and receive non-transferable NFT passes as permanent proof of attendance. Vendors at events accept USDC payments directly through the protocol, eliminating the need for separate payment systems.

## Key Features

- **Soulbound NFT Passes** — Non-transferable, on-chain proof of attendance minted automatically on ticket purchase
- **On-Chain Ticketing** — Ticket sales, pricing, and attendee tracking enforced by Soroban smart contracts
- **Vendor Marketplace** — Food, merch, and services ordered and paid for with USDC at events
- **Instant Settlement** — Stellar transactions confirm in 3–5 seconds with sub-cent fees
- **Freighter Wallet Integration** — One-click wallet connection for signing transactions
- **Responsive Dark Mode UI** — Glassmorphism design system built with Material Design 3 tokens

## Tech Stack

| Layer           | Technology                                 |
| --------------- | ------------------------------------------ |
| Smart Contracts | Rust, Soroban SDK                          |
| Frontend        | Next.js 16, TypeScript, Tailwind CSS v4    |
| Blockchain      | Stellar Network (Soroban)                  |
| Wallet          | Freighter (`@stellar/freighter-api`)       |
| SDK             | `@stellar/stellar-sdk`                     |
| Design          | Inter, Material Symbols, Material Design 3 |

## Getting Started

### Prerequisites

- Node.js 18+
- Rust + `soroban-cli` (for contract development)
- [Freighter Wallet](https://www.freighter.app/) browser extension

### Install & Run

```bash
git clone https://github.com/AstronLabs/EventMesh.git
cd EventMesh/frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and connect Freighter on Stellar Testnet.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (`git commit -m 'feat: add my feature'`)
4. Push your branch (`git push origin feat/my-feature`)
5. Open a pull request

## License

MIT
