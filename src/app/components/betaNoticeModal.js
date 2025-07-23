"use client";
import Modal from "@/app/components/modal";
import CustomButton from "@/app/components/button";
import { 
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";

export default function BetaNoticeModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-onboarding-text-primary mb-4">Development Notice</h2>
          
          <div className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <ExclamationTriangleIcon className="h-8 w-8 text-amber-500 mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-amber-800 mb-3 text-lg">Project in Development</p>
                <p className="text-amber-700 text-base leading-relaxed mb-4">
                  MatMind is currently in active development and not yet 100% complete. 
                  The training plans you see are generated using placeholder content while we work on 
                  integrating advanced AI capabilities.
                </p>
                <p className="text-amber-700 text-base leading-relaxed">
                  Thank you for your patience as we build something amazing for the BJJ community! 
                  Your feedback helps us improve the platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <CustomButton
            text="Got it, thanks!"
            callBack={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}