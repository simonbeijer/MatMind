"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/userContext";
import TermsModal from "@/app/components/termsModal";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function Dashboard() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    const termsAccepted = localStorage.getItem('matmind-terms-accepted');
    if (!termsAccepted) {
      setShowTermsModal(true);
    }
  }, []);

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };


  return (
    <div className="min-h-[calc(100vh-3rem)] bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary flex flex-col overflow-y-auto">
      <TermsModal isOpen={showTermsModal} onClose={closeTermsModal} showClose={false} />
      
      <div className="flex-1 w-full max-w-4xl mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-onboarding-text-primary mb-2">Welcome back!</h1>
          <p className="text-onboarding-text-muted">Here&apos;s your user information and dashboard overview.</p>
        </div>

        {/* New Layout - User Info on top left, How It Works tall on right */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Information - Takes 2 columns, top row */}
          <div className="lg:col-span-2">
            <div className="bg-onboarding-card-bg rounded-lg shadow-sm border border-onboarding-border-subtle p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h2 className="text-xl font-semibold text-onboarding-text-primary">User Information</h2>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 bg-onboarding-accent-start/20 border-2 border-onboarding-accent-start/40 rounded-full flex items-center justify-center text-onboarding-text-primary font-semibold text-lg">
                  JD
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-onboarding-text-primary">{user?.name || 'Alice'}</h3>
                  <span className="inline-block bg-onboarding-accent-start/20 text-onboarding-accent-start border border-onboarding-accent-start/30 text-sm px-3 py-1 rounded-full font-medium w-fit">
                    Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-onboarding-bg-secondary/20 border border-onboarding-border-subtle rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-4 h-4 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-onboarding-text-primary text-sm">Email</span>
                  </div>
                  <p className="text-onboarding-text-primary text-sm">{user?.email || 'user@example.com'}</p>
                </div>

                <div className="bg-onboarding-bg-secondary/20 border border-onboarding-border-subtle rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-4 h-4 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold text-onboarding-text-primary text-sm">Location</span>
                  </div>
                  <p className="text-onboarding-text-primary text-sm">Gothenberg, SE</p>
                </div>

                <div className="bg-onboarding-bg-secondary/20 border border-onboarding-border-subtle rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-4 h-4 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-onboarding-text-primary text-sm">Member Since</span>
                  </div>
                  <p className="text-onboarding-text-primary text-sm">January 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section - Takes 1 column, spans both rows */}
          <div className="lg:row-span-2">
            <div className="bg-onboarding-card-bg rounded-lg shadow-sm border border-onboarding-border-subtle p-6 backdrop-blur-sm h-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-onboarding-text-primary mb-4">
                  How It Works
                </h2>
                <p className="text-onboarding-text-muted">
                  Simple 3-step process to get your personalized plan
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-onboarding-bg-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-onboarding-text-primary mb-2">
                      Share Your Profile
                    </h3>
                    <p className="text-onboarding-text-muted text-sm">
                      Tell us about your belt rank, body type, training frequency, and current challenges
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-onboarding-bg-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-onboarding-text-primary mb-2">
                      Set Your Goals
                    </h3>
                    <p className="text-onboarding-text-muted text-sm">
                      Define what you want to achieve - compete better, train smarter, or develop specific skills
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-onboarding-bg-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-onboarding-text-primary mb-2">
                      Get Your Plan
                    </h3>
                    <p className="text-onboarding-text-muted text-sm">
                      Receive a comprehensive, personalized plan with drills, mindset work, and recovery protocols
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section - Under User Information, same width */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-onboarding-accent-end/20 to-onboarding-accent-start/20 rounded-3xl p-8 text-center border border-onboarding-border-subtle">
              <h2 className="text-4xl font-bold text-onboarding-text-primary mb-6">
                Ready to Transform Your Game?
              </h2>
              <p className="text-onboarding-text-muted text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of grapplers who are already training smarter with AI-powered personalized plans
              </p>
              <Link href="/onboarding">
                <button className="bg-gradient-to-r from-onboarding-accent-end to-onboarding-accent-start hover:from-onboarding-accent-end/80 hover:to-onboarding-accent-start/80 text-onboarding-bg-primary text-lg px-8 py-3 rounded-md transition-colors inline-flex items-center">
                  Start Your Journey <Zap className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
