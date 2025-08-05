"use client";
import { useRouter, usePathname } from "next/navigation";
import { useUserContext } from "../context/userContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "./dropdown";

export default function Header({ 
  showAuth = true, 
  showNavigation = true, 
  isHomepage = false 
}) {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(3);
  
  // Check if we're on onboarding page
  const isOnboarding = pathname?.includes('/onboarding');

  // Listen for step changes from onboarding page
  useEffect(() => {
    const handleStepChange = (event) => {
      if (event.detail) {
        setCurrentStep(event.detail.currentStep);
        setTotalSteps(event.detail.totalSteps);
      }
    };

    window.addEventListener('onboardingStepChange', handleStepChange);
    return () => window.removeEventListener('onboardingStepChange', handleStepChange);
  }, []);

  const logoutUser = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ User logged out successfully');
        setUser(null);
        router.push("/login");
      } else {
        console.error('❌ Logout failed:', response.status);
      }
    } catch (error) {
      console.error('❌ Logout error:', error.message);
    }
  };
  return (
    <header className="border-b border-onboarding-border-subtle bg-onboarding-bg-primary/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/mat-mind-icon.png"
            alt="MatMind Logo"
            width={52}
            height={52}
            className="w-[52px] h-[52px] rounded-lg mr-4"
          />
          <span className="text-onboarding-text-primary font-bold text-xl">
            MatMind
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {showNavigation && (
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-onboarding-text-primary hover:text-onboarding-accent-end font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/onboarding" className="text-onboarding-text-primary hover:text-onboarding-accent-end font-medium transition-colors">
                Onboard
              </Link>
            </nav>
          )}
          
          {showAuth && user && (
            <div>
              <Dropdown logoutUser={logoutUser} user={user} />
            </div>
          )}
          
          {isHomepage && (
            <Link href="/login">
              <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-4 py-2 rounded-md transition-colors">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
