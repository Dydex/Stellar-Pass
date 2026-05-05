"use client";

import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { truncateAddress } from "@/lib/utils";

export default function ConnectWallet() {
  const { address, isConnected, isLoading, connect, disconnect } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);

  if (isLoading) {
    return (
      <button className="btn-primary" disabled>
        <svg
          className="animate-spin-slow"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" opacity="0.3" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
        Connecting…
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div style={{ position: "relative" }}>
        <button
          className="btn-secondary"
          onClick={() => setShowDropdown(!showDropdown)}
          id="wallet-connected-btn"
          style={{ gap: "10px" }}
        >
          {/* Green dot indicator */}
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--em-success)",
              boxShadow: "0 0 8px rgba(34,197,94,0.5)",
              flexShrink: 0,
            }}
          />
          {truncateAddress(address, 5)}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transition: "transform 0.2s ease",
              transform: showDropdown ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {showDropdown && (
          <div
            className="glass-sm animate-fade-in"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              minWidth: "200px",
              padding: "8px",
              zIndex: 50,
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                fontSize: "0.8rem",
                color: "var(--em-text-muted)",
                borderBottom: "1px solid var(--em-border)",
                marginBottom: "4px",
                wordBreak: "break-all",
              }}
            >
              {address}
            </div>
            <button
              className="btn-ghost"
              style={{ width: "100%", justifyContent: "flex-start", color: "var(--em-error)" }}
              onClick={() => {
                disconnect();
                setShowDropdown(false);
              }}
              id="wallet-disconnect-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button className="btn-primary" onClick={connect} id="wallet-connect-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M22 10H18a2 2 0 00-2 2v0a2 2 0 002 2h4" />
        <line x1="6" y1="6" x2="6" y2="3" />
        <line x1="10" y1="6" x2="10" y2="3" />
      </svg>
      Connect Wallet
    </button>
  );
}
