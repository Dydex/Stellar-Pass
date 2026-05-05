"use client";

import Link from "next/link";
import type { EventOnChain } from "@/types/event";
import { hashGradient } from "@/lib/utils";

interface EventCardProps {
  event: EventOnChain;
}

export default function EventCard({ event }: EventCardProps) {
  const gradient = hashGradient(event.name + event.location);

  return (
    <Link
      href={`/events/${event.index}`}
      style={{ textDecoration: "none", color: "inherit" }}
      id={`event-card-${event.index}`}
    >
      <article
        className="glass card-lift gradient-border"
        style={{
          padding: 0,
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Colored header bar */}
        <div
          style={{
            height: "120px",
            background: gradient,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "16px",
          }}
        >
          {/* Location badge */}
          <span
            className="badge"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ marginRight: "4px" }}
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {event.name}
          </h3>

          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--em-text-muted)",
              lineHeight: 1.6,
              flex: 1,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {event.details}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              paddingTop: "12px",
              borderTop: "1px solid var(--em-border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
              <span style={{ fontSize: "0.8rem", color: "var(--em-text-muted)" }}>
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
                style={{ marginRight: "4px" }}
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
