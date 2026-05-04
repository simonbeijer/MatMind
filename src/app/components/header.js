"use client";
import { useRouter, usePathname } from "next/navigation";
import { useUserContext } from "../context/userContext";
import { useState, useEffect } from "react";
import Link from "next/link";
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
    <header className="border-b border-ink-line bg-bone">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label="MatMind home">
          <span
            className="block rounded-full bg-cinnabar"
            style={{ width: 10, height: 10 }}
            aria-hidden
          />
          <span
            className="font-serif italic text-ink"
            style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1 }}
          >
            Mat<span className="not-italic">Mind</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {showNavigation && (
            <nav className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="font-mono uppercase tracking-[0.15em] text-xs text-ink-soft hover:text-ink transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/onboarding"
                className="font-mono uppercase tracking-[0.15em] text-xs text-ink-soft hover:text-ink transition-colors"
              >
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
              <button className="font-mono uppercase tracking-[0.15em] text-xs bg-cinnabar text-bone px-4 py-2.5 hover:opacity-90 transition-opacity">
                Get started
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
