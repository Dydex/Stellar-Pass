"use client";

import { useState } from "react";
import type { EventOnChain } from "@/types/event";

interface PaymentModalProps {
  event: EventOnChain;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function PaymentModal({ event, onClose, onConfirm }: PaymentModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirm = async () => {
    setStatus("loading");
    try {
      await onConfirm();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} id="payment-modal-overlay">
      <div className="glass animate-slide-up" style={{ maxWidth: "440px", width: "100%", padding: "32px" }} onClick={(e) => e.stopPropagation()}>
        {status === "success" ? (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--em-success)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>Ticket Purchased!</h3>
            <p style={{ color: "var(--em-text-muted)", fontSize: "0.9rem", margin: 0 }}>Your soulbound NFT attendance pass has been minted.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: "8px" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0 }}>Buy Ticket</h3>
              <button className="btn-ghost" onClick={onClose} style={{ padding: "4px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="glass-surface" style={{ padding: "16px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--em-text-muted)", fontSize: "0.85rem" }}>Event</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{event.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--em-text-muted)", fontSize: "0.85rem" }}>Location</span>
                <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{event.location}</span>
              </div>
              <div style={{ height: "1px", background: "var(--em-border)" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--em-text-muted)", fontSize: "0.85rem" }}>Includes</span>
                <span className="badge badge-soulbound">Soulbound NFT Pass</span>
              </div>
            </div>
            {status === "error" && (
              <div style={{ padding: "12px", borderRadius: "var(--em-radius-sm)", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "var(--em-error)", fontSize: "0.85rem", marginBottom: "16px" }}>
                {errorMsg}
              </div>
            )}
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }} disabled={status === "loading"}>Cancel</button>
              <button className="btn-primary" onClick={handleConfirm} style={{ flex: 1 }} disabled={status === "loading"} id="payment-confirm-btn">
                {status === "loading" ? (
                  <><svg className="animate-spin-slow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" opacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg>Processing…</>
                ) : "Confirm Purchase"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
