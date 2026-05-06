"use client";

import Link from "next/link";
import type { EventOnChain } from "@/types/event";

interface EventCardProps {
  event: EventOnChain;
}

const HEADER_GRADIENTS = [
  "bg-gradient-to-br from-[#2563eb] via-[#7c3aed] to-[#ec4899]",
  "bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#a3e635]",
  "bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#facc15]",
  "bg-gradient-to-br from-[#312e81] via-[#6366f1] to-[#22d3ee]",
  "bg-gradient-to-br from-[#7c2d12] via-[#dc2626] to-[#fb7185]",
  "bg-gradient-to-br from-[#164e63] via-[#0ea5e9] to-[#8b5cf6]",
];

function getGradientIndex(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % HEADER_GRADIENTS.length;
}

export default function EventCard({ event }: EventCardProps) {
  const gradientClass =
    HEADER_GRADIENTS[getGradientIndex(event.name + event.location)];

  return (
    <Link
      href={`/events/${event.index}`}
      className="no-underline text-inherit"
      id={`event-card-${event.index}`}
    >
      <article className="glass card-lift gradient-border flex h-full cursor-pointer flex-col overflow-hidden p-0">
        {/* Colored header bar */}
        <div
          className={`relative flex h-[120px] items-end p-4 ${gradientClass}`}
        >
          {/* Location badge */}
          <span className="badge border border-white/20 bg-black/40 text-white backdrop-blur-md">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-1"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="m-0 text-[1.15rem] font-bold leading-[1.3] tracking-[-0.01em] text-on-surface">
            {event.name}
          </h3>

          <p className="m-0 flex-1 overflow-hidden text-ellipsis text-[0.85rem] leading-[1.6] text-on-surface-variant line-clamp-3">
            {event.details}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 border-t border-outline-variant/60 pt-3">
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--em-accent-1)"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              <span className="text-[0.8rem] text-on-surface-variant/80">
                {event.ticketsSold} attending
              </span>
            </div>

            <span className="badge badge-accent">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="mr-1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              NFT Pass
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
