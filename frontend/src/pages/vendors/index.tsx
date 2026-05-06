"use client";

import React, { useMemo, useState } from "react";
import type { Vendor } from "@/types/vendor";
import VendorCard from "@/components/VendorCard";

const MOCK_VENDORS: Vendor[] = [
  {
    id: "v1",
    name: "Ether Burger",
    description: "Double wagyu smash patty, truffle aioli.",
    category: "food",
    price: 8.5,
    eventId: 0,
    walletAddress: "GAAA...MOCK",
  },
  {
    id: "v2",
    name: "Node Nitro Cold Brew",
    description: "24h cold brew infused with nitrogen.",
    category: "drinks",
    price: 4.0,
    eventId: 0,
    walletAddress: "GBBB...MOCK",
  },
  {
    id: "v3",
    name: "Consensus Margherita",
    description: "Wood-fired sourdough pizza, San Marzano tomatoes.",
    category: "food",
    price: 12.0,
    eventId: 0,
    walletAddress: "GCCC...MOCK",
  },
  {
    id: "v4",
    name: "Event Merch Tee",
    description: "Limited edition EventMesh tee — cotton blend.",
    category: "merch",
    price: 22.0,
    eventId: 0,
    walletAddress: "GDDD...MOCK",
  },
  {
    id: "v5",
    name: "Quick Charge Station",
    description: "Phone charging kiosks and USB-C power banks.",
    category: "services",
    price: 3.5,
    eventId: 0,
    walletAddress: "GEEE...MOCK",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Options", icon: "restaurant" },
  { key: "food", label: "Snacks", icon: "fastfood" },
  { key: "drinks", label: "Drinks", icon: "local_drink" },
  { key: "meals", label: "Full Meals", icon: "lunch_dining" },
] as const;

export default function VendorsPage() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]["key"]>("all");

  function addToCart(v: Vendor) {
    setCart((c) => ({ ...c, [v.id]: (c[v.id] || 0) + 1 }));
  }

  function removeFromCart(v: Vendor) {
    setCart((c) => {
      const next = { ...c };
      if (!next[v.id]) return next;
      next[v.id] = Math.max(0, next[v.id] - 1);
      if (next[v.id] === 0) delete next[v.id];
      return next;
    });
  }

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const vendor = MOCK_VENDORS.find((v) => v.id === id)!;
      return { vendor, qty };
    });
  }, [cart]);

  const visibleVendors = useMemo(() => {
    if (activeCategory === "all") {
      return MOCK_VENDORS;
    }

    if (activeCategory === "meals") {
      return MOCK_VENDORS.filter((vendor) => vendor.category === "food");
    }

    return MOCK_VENDORS.filter((vendor) => vendor.category === activeCategory);
  }, [activeCategory]);

  const subtotal = cartItems.reduce((s, it) => s + it.vendor.price * it.qty, 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-on-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,193,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(78,222,163,0.1),transparent_28%)]" />

      <div className="relative mx-auto flex w-full max-w-container-max flex-col gap-xl px-gutter py-[88px] lg:flex-row">
        <section className="min-w-0 flex-1 space-y-6">
          <header className="space-y-4 py-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              Official Vendors
            </div>

            <div className="max-w-3xl space-y-3">
              <h1 className="text-h1 text-on-background sm:text-[44px] lg:text-display">
                Metaverse Meetup Food Court
              </h1>
              <p className="max-w-2xl text-body-lg text-on-surface-variant">
                Secure, on-chain payments for premium food and beverages. Skip
                the line by ordering directly from your wallet.
              </p>
            </div>
          </header>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.key;

              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary text-on-primary shadow-[0_0_18px_rgba(192,193,255,0.22)]"
                      : "border-outline-variant bg-surface-container text-on-surface-variant hover:border-primary/50 hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {category.icon}
                  </span>
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {visibleVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} onPay={addToCart} />
            ))}
          </div>
        </section>

        <aside className="lg:w-[380px] lg:shrink-0">
          <div className="sticky top-[100px] rounded-2xl border border-outline-variant/70 bg-surface-container-lowest/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-4">
              <h2 className="flex items-center gap-2 text-h2 text-on-background">
                <span className="material-symbols-outlined">
                  shopping_basket
                </span>
                Current Order
              </h2>
              <span className="rounded-md bg-surface-variant px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                {cartItems.reduce((s, i) => s + i.qty, 0)} Items
              </span>
            </div>

            <div className="mt-4 flex max-h-[390px] flex-col gap-4 overflow-y-auto pr-1">
              {cartItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low px-4 py-5 text-sm text-on-surface-variant">
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map(({ vendor, qty }) => (
                  <div
                    key={vendor.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-outline-variant/60 bg-surface-container-low px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-on-background">
                        {qty}x {vendor.name}
                      </div>
                      <div className="mt-1 text-sm leading-5 text-on-surface-variant">
                        {vendor.description}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="font-mono text-sm font-semibold text-on-background">
                        {(vendor.price * qty).toFixed(2)} XLM
                      </div>
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:border-primary hover:text-on-background"
                          onClick={() => removeFromCart(vendor)}
                          aria-label={`Remove one ${vendor.name}`}
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg border border-outline-variant bg-surface-container text-on-surface-variant transition-colors hover:border-primary hover:text-on-background"
                          onClick={() => addToCart(vendor)}
                          aria-label={`Add one more ${vendor.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 border-t border-dashed border-outline-variant/70 pt-4">
              <div className="space-y-2 text-sm text-on-surface-variant">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{subtotal.toFixed(2)} XLM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Network Fee (Est)</span>
                  <span className="font-mono">0.05 XLM</span>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <span className="text-body-lg font-semibold text-on-background">
                  Total
                </span>
                <span className="text-h2 font-mono text-primary">
                  {(subtotal + 0.05).toFixed(2)} XLM
                </span>
              </div>

              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary shadow-[0_0_18px_rgba(192,193,255,0.28)] transition-colors hover:bg-inverse-primary"
                onClick={() =>
                  alert(
                    `Pay ${(subtotal + 0.05).toFixed(2)} XLM — connect wallet to proceed`,
                  )
                }
              >
                <span className="material-symbols-outlined text-[18px]">
                  account_balance_wallet
                </span>
                Pay {(subtotal + 0.05).toFixed(2)} XLM
              </button>

              <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-on-surface-variant/80">
                <span className="material-symbols-outlined text-[14px]">
                  lock
                </span>
                Smart Contract Secured
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
