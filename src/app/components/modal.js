"use client";
import React from "react";

export default function Modal({ isOpen, onClose, children, showClose = true }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-onboarding-bg-primary/50 flex items-center justify-center z-50">
      <div className="bg-onboarding-card-bg p-6 rounded-lg min-w-[300px] shadow-xl border border-onboarding-border-subtle backdrop-blur-sm">
        {showClose && (
          <button onClick={onClose} className="mb-4 text-right text-sm text-onboarding-text-muted hover:text-onboarding-text-primary transition-colors">
            Close
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
