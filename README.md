# Stellar-Pass

Stellar-Pass is an event and vendor dApp on Stellar with three core features:

1. Event payments in XLM and USDC
2. NFT attendance passes (Stellar Classic custom assets)
3. Vendor marketplace payments during events

## Problem

| Pain Point | Traditional Approach | Stellar-Pass |
|---|---|---|
| Payment friction | Multiple processors, high fees, slow settlement | Near-instant settlement on Stellar with low fees |
| No proof of attendance | Paper/QR tickets that can be lost or forged | On-chain NFT attendance pass |
| Vendor fragmentation | Cash or separate POS systems | Unified on-chain payments |
| Stablecoin support | Volatility concerns | USDC support on Stellar |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS, TypeScript |
| Backend | Express, TypeScript |
| Blockchain | Stellar Network (Classic operations) |
| SDK | @stellar/stellar-sdk |
| Wallet | @stellar/freighter-api |
| NFTs | 1-of-1 Stellar Classic custom assets with locked issuers |

## Project Structure

```text
Stellar-Pass/
├── README.md
├── .env
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── types/
└── frontend/
   ├── package.json
   ├── next.config.ts
   ├── tsconfig.json
   ├── public/
   └── src/
      ├── app/
      ├── components/
      ├── hooks/
      ├── lib/
      └── types/
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Freighter Wallet browser extension

### Install

```bash
git clone https://github.com/your-username/Stellar-Pass.git
cd Stellar-Pass

cd backend && npm install
cd ../frontend && npm install
```

### Run locally

Use two terminals from the repository root.

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Open http://localhost:3000 and connect Freighter on Stellar Testnet.

## Key Features

- Fast payments on Stellar
- XLM and USDC support
- NFT attendance passes
- Vendor payment flows
- End-to-end TypeScript

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a pull request

## License

MIT
