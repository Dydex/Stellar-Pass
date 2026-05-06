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
    <header className="glass sticky top-0 z-[90] rounded-none border-x-0 border-t-0 border-b border-b-outline-variant/70">
      {/* Gradient accent line at very top */}
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-tertiary" />

      <nav className="mx-auto flex h-16 max-w-container-max items-center justify-between px-gutter">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-inherit no-underline"
          id="nav-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[var(--em-accent-gradient)] text-[16px] font-bold text-white shadow-[0_2px_12px_rgba(124,58,237,0.3)]">
            E
          </div>
          <span className="text-[1.15rem] font-bold tracking-[-0.02em]">
            Event<span className="gradient-text">Mesh</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-desktop hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`btn-ghost relative rounded-sm text-[0.875rem] no-underline ${isActive ? "bg-surface text-on-surface" : "bg-transparent text-on-surface-variant"}`}
                id={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: wallet + mobile menu toggle */}
        <div className="flex items-center gap-3">
          <div className="nav-desktop hidden md:block">
            <ConnectWallet />
          </div>

          {/* Mobile hamburger */}
          <button
            className="btn-ghost nav-mobile-toggle hidden p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
        <div className="nav-mobile-menu animate-fade-in flex flex-col gap-1 border-t border-outline-variant/70 px-gutter pb-5 pt-2 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`btn-ghost justify-start no-underline ${isActive ? "text-on-surface" : "text-on-surface-variant"}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2">
            <ConnectWallet />
          </div>
        </div>
      )}
    </header>
  );
}
