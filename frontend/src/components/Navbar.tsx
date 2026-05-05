"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectWallet from "./ConnectWallet";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/dashboard", label: "My Passes" },
  { href: "/dashboard/organizer", label: "Organizer" },
  { href: "/vendors", label: "Vendors" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="glass"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 90,
        borderRadius: 0,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "1px solid var(--em-border)",
      }}
    >
      {/* Gradient accent line at very top */}
      <div
        style={{
          height: "2px",
          background: "var(--em-accent-gradient-h)",
          width: "100%",
        }}
      />

      <nav
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "inherit",
          }}
          id="nav-logo"
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: "var(--em-accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              boxShadow: "0 2px 12px rgba(124,58,237,0.3)",
            }}
          >
            E
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
            Event<span className="gradient-text">Mesh</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className="btn-ghost"
                style={{
                  color: isActive ? "var(--em-text)" : "var(--em-text-muted)",
                  background: isActive ? "var(--em-surface)" : "transparent",
                  borderRadius: "var(--em-radius-sm)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  position: "relative",
                }}
                id={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "16px",
                      height: "2px",
                      background: "var(--em-accent-gradient-h)",
                      borderRadius: "999px",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: wallet + mobile menu toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="nav-desktop">
            <ConnectWallet />
          </div>

          {/* Mobile hamburger */}
          <button
            className="btn-ghost nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
            style={{ padding: "8px" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="animate-fade-in nav-mobile-menu"
          style={{
            padding: "8px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderTop: "1px solid var(--em-border)",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="btn-ghost"
                style={{
                  justifyContent: "flex-start",
                  color: isActive ? "var(--em-text)" : "var(--em-text-muted)",
                  textDecoration: "none",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ marginTop: "8px" }}>
            <ConnectWallet />
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-mobile-toggle {
          display: none;
        }
        .nav-mobile-menu {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: flex !important;
          }
          .nav-mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
