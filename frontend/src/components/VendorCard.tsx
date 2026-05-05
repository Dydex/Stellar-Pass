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
  return (
    <div className="glass card-lift gradient-border" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }} id={`vendor-card-${vendor.id}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.5rem" }}>{CATEGORY_ICONS[vendor.category] ?? "🏪"}</span>
          <div>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>{vendor.name}</h4>
            <span style={{ fontSize: "0.75rem", color: "var(--em-text-dim)", textTransform: "capitalize" }}>{vendor.category}</span>
          </div>
        </div>
        <span className="badge badge-accent" style={{ fontSize: "0.8rem", fontWeight: 700 }}>{vendor.price} XLM</span>
      </div>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--em-text-muted)", lineHeight: 1.6 }}>{vendor.description}</p>
      {onPay && (
        <button className="btn-primary" style={{ width: "100%", padding: "10px" }} onClick={() => onPay(vendor)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
          Pay {vendor.price} XLM
        </button>
      )}
    </div>
  );
}
