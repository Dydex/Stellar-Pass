"use client";

import type { NFTMetadata } from "@/types/nft";
import { truncateAddress } from "@/lib/utils";

interface NFTPassCardProps {
  metadata: NFTMetadata;
  contractId?: string;
}

export default function NFTPassCard({ metadata, contractId }: NFTPassCardProps) {
  return (
    <div className="glass holo-card card-lift" style={{ padding: 0, overflow: "hidden", position: "relative" }} id={contractId ? `nft-pass-${contractId}` : undefined}>
      <div style={{ height: "4px", background: "var(--em-accent-gradient-h)" }} />
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--em-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Attendance Pass</span>
            <h3 className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{metadata.event_name}</h3>
          </div>
          <span className="badge badge-soulbound">Soulbound</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="glass-surface" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--em-text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Location</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{metadata.location}</span>
          </div>
          <div className="glass-surface" style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--em-text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Organizer</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-geist-mono)" }}>{truncateAddress(metadata.owner, 4)}</span>
          </div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--em-text-muted)", lineHeight: 1.6, margin: 0 }}>{metadata.event_details}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid var(--em-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--em-accent-2)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span style={{ fontSize: "0.75rem", color: "var(--em-text-dim)" }}>Non-transferable</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--em-success)", boxShadow: "0 0 6px rgba(34,197,94,0.4)" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--em-success)" }}>Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
