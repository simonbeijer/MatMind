"use client";
import Modal from "@/app/components/modal";
import CustomButton from "@/app/components/button";

export default function BetaNoticeModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false}>
      <div className="space-y-7">
        <div>
          <div className="font-mono uppercase tracking-[0.2em] text-[10px] text-cinnabar mb-3">
            ● Beta · v0.1
          </div>
          <h2 className="font-display uppercase tracking-[0.02em] text-3xl text-onboarding-text-primary leading-tight">
            Still building.
          </h2>
        </div>

        <div className="border border-onboarding-border-subtle bg-onboarding-bg-secondary p-5 space-y-3">
          <p className="font-serif text-base text-onboarding-text-primary leading-snug">
            MatMind is in active development. The plans you see use placeholder content while we
            integrate full AI capabilities.
          </p>
          <p className="font-serif text-base text-onboarding-text-muted leading-snug">
            Thanks for the patience — your feedback shapes the platform.
          </p>
        </div>

        <CustomButton text="Got it" callBack={onClose} />
      </div>
    </Modal>
  );
}
