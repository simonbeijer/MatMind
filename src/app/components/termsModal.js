"use client";
import { useState } from "react";
import Modal from "@/app/components/modal";
import CustomButton from "@/app/components/button";
import { 
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

export default function TermsModal({ isOpen, onClose, showClose = true }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);

  const handleAcceptTerms = () => {
    if (termsAccepted && gdprAccepted) {
      localStorage.setItem('personal-letter-llm-terms-accepted', new Date().toISOString());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={showClose}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Terms and Disclaimer Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-onboarding-text-primary mb-4">Terms of Use & Privacy Notice</h2>
          
          <div className="mb-4 bg-onboarding-card-bg border border-onboarding-border-subtle rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-onboarding-text-muted mt-1 flex-shrink-0" />
              <div className="text-sm text-left pt-1">
                <p className="font-semibold text-onboarding-text-primary mb-2">Important Disclaimer</p>
                <p className="text-onboarding-text-muted">
                  This application uses AI technology to generate cover letters. Use at your own risk. 
                  We bear no responsibility for the content generated, job application outcomes, or any consequences 
                  arising from the use of this service. Always review and customize generated content before use.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 bg-onboarding-bg-secondary border border-onboarding-border-subtle rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <InformationCircleIcon className="h-5 w-5 text-onboarding-text-muted mt-1 flex-shrink-0" />
              <div className="text-sm text-left pt-1">
                <p className="font-semibold text-onboarding-text-primary mb-2">AI Technology Notice</p>
                <p className="text-onboarding-text-muted">
                  This service is powered by Google&apos;s Gemini AI. Your uploaded documents and generated content 
                  may be processed by Google&apos;s systems according to their privacy policies. 
                  Please avoid uploading sensitive personal information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-4 mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-onboarding-accent-end bg-onboarding-card-bg border-onboarding-border-input rounded focus:ring-onboarding-accent-end focus:ring-2"
            />
            <span className="text-sm text-onboarding-text-primary">
              I agree to the Terms of Service and acknowledge that this is an experimental AI tool. 
              I understand the limitations and disclaimers stated above.
            </span>
          </label>

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={gdprAccepted}
              onChange={(e) => setGdprAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-onboarding-accent-end bg-onboarding-card-bg border-onboarding-border-input rounded focus:ring-onboarding-accent-end focus:ring-2"
            />
            <span className="text-sm text-onboarding-text-primary">
              I consent to the processing of my data as described above and understand that my documents 
              will be processed by AI systems for the purpose of generating cover letters.
            </span>
          </label>
        </div>

        {/* Accept Button */}
        <div className="text-center">
          <CustomButton
            text={termsAccepted && gdprAccepted ? "Accept & Continue" : "Please accept terms to continue"}
            callBack={handleAcceptTerms}
            disabled={!termsAccepted || !gdprAccepted}
          />
        </div>
      </div>
    </Modal>
  );
}