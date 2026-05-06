"use client";

import { useState } from "react";
import type { EventOnChain } from "@/types/event";

interface PaymentModalProps {
  event: EventOnChain;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function PaymentModal({
  event,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
    <div
      className="modal-overlay animate-fade-in"
      onClick={onClose}
      id="payment-modal-overlay"
    >
      <div
        className="glass animate-slide-up w-full max-w-[440px] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--em-success)"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="m-0 text-[1.3rem] font-bold">Ticket Purchased!</h3>
            <p className="m-0 text-[0.9rem] text-on-surface-variant/80">
              Your soulbound NFT attendance pass has been minted.
            </p>
            <button className="btn-primary mt-2" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="m-0 text-[1.2rem] font-bold">Buy Ticket</h3>
              <button className="btn-ghost p-1" onClick={onClose}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="glass-surface mb-5 flex flex-col gap-3 p-4">
              <div className="flex justify-between gap-4">
                <span className="text-[0.85rem] text-on-surface-variant/80">
                  Event
                </span>
                <span className="text-[0.9rem] font-semibold text-on-surface">
                  {event.name}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[0.85rem] text-on-surface-variant/80">
                  Location
                </span>
                <span className="text-[0.9rem] font-semibold text-on-surface">
                  {event.location}
                </span>
              </div>
              <div className="h-px bg-outline-variant/60" />
              <div className="flex justify-between gap-4">
                <span className="text-[0.85rem] text-on-surface-variant/80">
                  Includes
                </span>
                <span className="badge badge-soulbound">
                  Soulbound NFT Pass
                </span>
              </div>
            </div>
            {status === "error" && (
              <div className="mb-4 rounded-md border border-error/30 bg-error/10 p-3 text-[0.85rem] text-error">
                {errorMsg}
              </div>
            )}
            <div className="flex gap-3">
              <button
                className="btn-secondary flex-1"
                onClick={onClose}
                disabled={status === "loading"}
              >
                Cancel
              </button>
              <button
                className="btn-primary flex-1"
                onClick={handleConfirm}
                disabled={status === "loading"}
                id="payment-confirm-btn"
              >
                {status === "loading" ? (
                  <>
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
                    Processing…
                  </>
                ) : (
                  "Confirm Purchase"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
