"use client";

import type { NFTMetadata } from "@/types/nft";
import { truncateAddress } from "@/lib/utils";

interface NFTPassCardProps {
  metadata: NFTMetadata;
  contractId?: string;
}

export default function NFTPassCard({
  metadata,
  contractId,
}: NFTPassCardProps) {
  return (
    <div
      className="glass holo-card card-lift relative overflow-hidden p-0"
      id={contractId ? `nft-pass-${contractId}` : undefined}
    >
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-on-surface-variant/80">
              Attendance Pass
            </span>
            <h3 className="gradient-text m-0 text-[1.2rem] font-bold leading-[1.3]">
              {metadata.event_name}
            </h3>
          </div>
          <span className="badge badge-soulbound">Soulbound</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-surface flex flex-col gap-1.5 p-3">
            <span className="text-[0.7rem] uppercase tracking-[0.06em] text-on-surface-variant/80">
              Location
            </span>
            <span className="text-[0.9rem] font-semibold text-on-surface">
              {metadata.location}
            </span>
          </div>
          <div className="glass-surface flex flex-col gap-1.5 p-3">
            <span className="text-[0.7rem] uppercase tracking-[0.06em] text-on-surface-variant/80">
              Organizer
            </span>
            <span className="font-mono text-[0.9rem] font-semibold text-on-surface">
              {truncateAddress(metadata.owner, 4)}
            </span>
          </div>
        </div>
        <p className="m-0 text-[0.85rem] leading-6 text-on-surface-variant">
          {metadata.event_details}
        </p>
        <div className="flex items-center justify-between border-t border-outline-variant/60 pt-3">
          <div className="flex items-center gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--em-accent-2)"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[0.75rem] text-on-surface-variant/80">
              Non-transferable
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
            <span className="text-[0.75rem] text-success">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
