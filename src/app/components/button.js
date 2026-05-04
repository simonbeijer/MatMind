"use client"
export default function CustomButton({ text, callBack, type = "button", disabled = false }) {
    return (
        <button
            onClick={callBack}
            type={type}
            disabled={disabled}
            className="w-full px-5 py-3.5 bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-xs disabled:opacity-50 hover:opacity-90 transition-opacity duration-150 focus:outline-none focus:ring-2 focus:ring-cinnabar focus:ring-offset-2 focus:ring-offset-onboarding-bg-primary"
        >
            {text}
        </button>
    );
};
