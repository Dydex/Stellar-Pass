---
name: On-Chain Protocol UI
colors:
  surface: '#13131b'
  surface-dim: '#13131b'
  surface-bright: '#393841'
  surface-container-lowest: '#0d0d15'
  surface-container-low: '#1b1b23'
  surface-container: '#1f1f27'
  surface-container-high: '#292932'
  surface-container-highest: '#34343d'
  on-surface: '#e4e1ed'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1ed'
  inverse-on-surface: '#303038'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#13131b'
  on-background: '#e4e1ed'
  surface-variant: '#34343d'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  mono:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '450'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is built for the intersection of high-stakes blockchain technology and professional event management. The brand personality is institutional yet accessible, prioritizing clarity and data integrity over decorative flourishes. It avoids the neon-heavy tropes of early Web3, opting instead for a "Figma-professional" aesthetic characterized by rigorous alignment, generous whitespace, and a high-utility technical feel.

The visual direction combines **Minimalism** with subtle **Glassmorphism**. Surfaces are treated as physical layers; backdrop blurs and thin 1px borders define the spatial hierarchy. The result is a premium DApp experience that feels fast, secure, and reliable for both event organizers and attendees.

## Colors

The palette is anchored by a vibrant Indigo primary (#6366F1), used strategically for high-contrast call-to-action elements and active states. To support the on-chain nature of the platform, a secondary Emerald is used for success states and "confirmed" transaction indicators.

The neutral scale utilizes a deep Slate palette. In **Dark Mode**, the background uses a saturated navy-black to maintain depth, while **Light Mode** transitions to a clean, gallery-white environment. Depth is achieved through "Elevated" and "Surface" neutral shades rather than flat blacks, ensuring that thin borders and glass effects remain visible across all viewport types.

## Typography

The design system utilizes **Inter** across all levels to maintain a systematic, utilitarian feel. The type scale is designed for high information density, allowing complex event details and wallet addresses to remain legible. 

Headlines utilize tighter tracking and heavier weights to create a strong visual anchor. For technical data—such as transaction hashes or smart contract addresses—a monospaced fallback is employed. Body text is prioritized for readability, with a generous line-height to prevent eye fatigue during long browsing sessions.

## Layout & Spacing

This design system uses a **12-column fluid grid** for dashboard views and a **fixed, centered grid** for landing and event discovery pages. The spacing rhythm is based on an 8px square grid, ensuring consistent vertical rhythm and alignment.

Margins are generous (24px on mobile, 48px+ on desktop) to evoke a premium, airy feel. Components like event cards and ticket tiers are separated by "lg" spacing (24px) to allow the glassmorphic borders enough breathing room to define the edges without feeling cluttered.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and **Tonal Layering**. Instead of heavy shadows, this design system uses:

1.  **Backdrop Blurs:** High-level containers (modals, navigation bars) use a 12px-16px blur with a semi-transparent background (e.g., `rgba(255, 255, 255, 0.05)` in dark mode).
2.  **Thin Borders:** Every interactive card and container features a 1px solid border. In dark mode, these use a low-opacity white (`rgba(255, 255, 255, 0.1)`); in light mode, a subtle slate.
3.  **Subtle Ambient Shadows:** Only the top-most layer (modals or active dropdowns) receives a diffused, low-opacity shadow to provide clear separation from the background.
4.  **Tonal Offsets:** Page sections alternate between the base background color and a slightly lighter/darker "Surface" color to define content groups without needing lines.

## Shapes

The shape language is consistently rounded to humanize the technical nature of the blockchain. A base roundedness of **16px (rounded-xl)** is used for primary containers and event cards. Smaller elements like buttons and input fields use **8px (rounded-lg)** to maintain a crisp, professional appearance. 

Status chips and user avatars utilize a full circle (pill-shape) to distinguish them from functional UI components.

## Components

### Buttons
- **Primary:** Solid #6366F1 background with white text. High-contrast, no gradient.
- **Secondary:** Glassmorphic fill (10% opacity) with a 1px border. 
- **Ghost:** No background, primary color text, used for secondary actions like "Cancel."

### Cards
- **Event Cards:** 1px border, 16px corner radius. Feature a subtle top-down linear gradient (e.g., white at 5% to transparent).
- **Interactive State:** Hovering on a card should increase the border opacity and slightly lift the element with a subtle ambient shadow.

### Inputs
- **Fields:** Dark, inset backgrounds with 1px borders that highlight to the primary color on focus.
- **Wallet Connect:** A dedicated persistent component in the navigation bar using a glassmorphic pill shape, displaying the ENS name or truncated address.

### Chips & Badges
- **Status Badges:** Used for "Live," "Sold Out," or "Upcoming." These should use a low-saturation background and a high-saturation text color for readability.

### Web3 Specifics
- **Transaction Feedback:** Inline loaders within buttons and "Transaction Pending" toast notifications with glass effects and progress bars.
- **Ticket NFTs:** Distinctive card style with a slightly more aggressive gradient and a "Holographic" border effect to signify rarity or value.