"use client"
export default function CustomButton({text, callBack, type = "button", disabled = false }) {
    return (
        <button 
            onClick={callBack} 
            type={type} 
            disabled={disabled}  
            className="w-full px-4 py-3 bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 disabled:opacity-50 text-onboarding-bg-primary font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-onboarding-accent-end focus:ring-offset-2"
        >
            {text}
        </button>
    );
};