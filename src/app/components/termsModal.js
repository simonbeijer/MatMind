"use client";
import { useState } from "react";
import Modal from "@/app/components/modal";
import CustomButton from "@/app/components/button";

export default function TermsModal({ isOpen, onClose, showClose = true }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const handleAcceptTerms = () => {
    if (termsAccepted && gdprAccepted) {
      localStorage.setItem('matmind-terms-accepted', new Date().toISOString());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={showClose}>
      <div className="space-y-7">
        <div>
          <div className="font-mono uppercase tracking-[0.2em] text-[10px] text-cinnabar mb-3">
            ● Terms · Privacy
          </div>
          <h2 className="font-display uppercase tracking-[0.02em] text-3xl text-onboarding-text-primary leading-tight">
            Before we begin.
          </h2>
        </div>

        <div className="border border-onboarding-border-subtle bg-onboarding-bg-secondary p-5">
          <div className="font-mono uppercase tracking-[0.2em] text-[10px] text-cinnabar mb-2">
            §A / Disclaimer
          </div>
          <p className="font-serif text-sm text-onboarding-text-primary leading-snug">
            This application uses AI to generate training plans. Use at your own risk.
            We bear no responsibility for the content generated, training outcomes, or any consequences
            arising from the use of this service. Always review and customize generated content before use.
          </p>
        </div>

        <div className="border border-onboarding-border-subtle bg-onboarding-bg-secondary p-5">
          <div className="font-mono uppercase tracking-[0.2em] text-[10px] text-cinnabar mb-2">
            §B / AI notice
          </div>
          <p className="font-serif text-sm text-onboarding-text-primary leading-snug">
            This service is powered by Google&apos;s Gemini AI. Your inputs and generated content
            may be processed by Google&apos;s systems according to their privacy policies.
            Avoid uploading sensitive personal information.
          </p>
        </div>

        <div className="space-y-4 border-t border-onboarding-border-subtle pt-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-cinnabar"
            />
            <span className="font-serif text-sm text-onboarding-text-primary leading-snug">
              I agree to the Terms of Service and acknowledge this is an experimental AI tool.
              I understand the limitations and disclaimers above.
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={gdprAccepted}
              onChange={(e) => setGdprAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 accent-cinnabar"
            />
            <span className="font-serif text-sm text-onboarding-text-primary leading-snug">
              I consent to the processing of my data as described and understand that my inputs
              will be processed by AI systems for the purpose of generating training plans.
            </span>
          </label>
        </div>

        <CustomButton
          text={termsAccepted && gdprAccepted ? "Accept & continue" : "Accept terms above"}
          callBack={handleAcceptTerms}
          disabled={!termsAccepted || !gdprAccepted}
        />
      </div>
    </Modal>
  );
}
