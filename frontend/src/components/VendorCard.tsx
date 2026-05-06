"use client";

import type { Vendor } from "@/types/vendor";

interface VendorCardProps {
  vendor: Vendor;
  onPay?: (vendor: Vendor) => void;
}

const CATEGORY_ICONS: Record<string, string> = {
  food: "🍔",
  drinks: "🍺",
  merch: "👕",
  services: "⚡",
};

export default function VendorCard({ vendor, onPay }: VendorCardProps) {
  const icon = CATEGORY_ICONS[vendor.category] ?? "🏪";

  return (
    <article
      id={`vendor-card-${vendor.id}`}
      className="group overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-low shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)]"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,193,255,0.35),transparent_48%),radial-gradient(circle_at_bottom_left,rgba(78,222,163,0.16),transparent_40%)]" />
        <div className="absolute inset-0 flex items-end justify-between p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/20 text-2xl ring-1 ring-white/10 backdrop-blur-sm">
              {icon}
            </span>
            <div className="max-w-[12rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface-variant/80">
                {vendor.category}
              </p>
              <h4 className="mt-1 text-lg font-semibold text-on-background">
                {vendor.name}
              </h4>
            </div>
          </div>
          <span className="rounded-full border border-secondary/25 bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container shadow-sm">
            {vendor.price.toFixed(2)} XLM
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <p className="min-h-[3.5rem] text-sm leading-6 text-on-surface-variant">
          {vendor.description}
        </p>
        {onPay && (
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-inverse-primary"
            onClick={() => onPay(vendor)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            Pay {vendor.price.toFixed(2)} XLM
          </button>
        )}
      </div>
    </article>
  );
}
