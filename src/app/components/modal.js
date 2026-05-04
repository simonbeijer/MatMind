"use client";
import React from "react";

export default function Modal({ isOpen, onClose, children, showClose = true }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-onboarding-bg-primary/80 flex items-center justify-center z-50 px-6">
      <div className="bg-onboarding-bg-primary p-7 min-w-[300px] max-w-2xl w-full border border-onboarding-text-primary">
        {showClose && (
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted hover:text-onboarding-text-primary transition-colors"
            >
              [ × Close ]
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
