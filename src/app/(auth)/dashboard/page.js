"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/userContext";
import TermsModal from "@/app/components/termsModal";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Calendar } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Share your profile",
    body: "Belt rank, body type, training frequency, current challenges.",
  },
  {
    n: "02",
    title: "Set your goals",
    body: "Compete better, train smarter, or develop specific positions.",
  },
  {
    n: "03",
    title: "Receive your plan",
    body: "Personalized drills, mindset work, and recovery protocols.",
  },
];

export default function Dashboard() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    const termsAccepted = localStorage.getItem('matmind-terms-accepted');
    if (!termsAccepted) setShowTermsModal(true);
  }, []);

  const closeTermsModal = () => setShowTermsModal(false);

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-onboarding-bg-primary">
      <TermsModal isOpen={showTermsModal} onClose={closeTermsModal} showClose={false} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-onboarding-text-muted mb-3">
            <span className="text-cinnabar">●</span> Dojo / Dashboard
          </div>
          <h1 className="font-display uppercase tracking-[0.02em] text-4xl md:text-5xl leading-tight text-onboarding-text-primary">
            Welcome back.
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-onboarding-border-subtle border border-onboarding-border-subtle mb-px">
          <div className="lg:col-span-2 bg-onboarding-bg-primary p-8">
            <div className="font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-6">
              §01 / Profile
            </div>

            <div className="flex items-start gap-5 mb-8 pb-8 border-b border-onboarding-border-subtle">
              <div className="w-14 h-14 bg-cinnabar text-onboarding-bg-primary flex items-center justify-center font-display tracking-[0.05em] text-lg">
                {(user?.name || 'A')[0].toUpperCase()}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="font-display uppercase tracking-[0.03em] text-xl text-onboarding-text-primary">
                  {user?.name || 'Alice'}
                </h2>
                <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-cinnabar">
                  ● Active
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt className="flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-1.5">
                  <Mail className="w-3 h-3" strokeWidth={1.5} />
                  Email
                </dt>
                <dd className="font-mono text-sm text-onboarding-text-primary break-all">
                  {user?.email || 'user@example.com'}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-1.5">
                  <MapPin className="w-3 h-3" strokeWidth={1.5} />
                  Location
                </dt>
                <dd className="font-mono text-sm text-onboarding-text-primary">
                  Gothenberg, SE
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-1.5">
                  <Calendar className="w-3 h-3" strokeWidth={1.5} />
                  Member since
                </dt>
                <dd className="font-mono text-sm text-onboarding-text-primary">
                  Jan 2024
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:row-span-2 bg-onboarding-bg-primary p-8">
            <div className="font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-6">
              §02 / How it works
            </div>

            <ol className="space-y-7">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="flex items-start gap-4">
                  <span className="font-display tracking-[0.05em] text-2xl text-cinnabar leading-none mt-0.5">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-display uppercase tracking-[0.04em] text-base text-onboarding-text-primary mb-1">
                      {title}
                    </h3>
                    <p className="font-serif text-sm text-onboarding-text-muted leading-snug">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2 bg-onboarding-bg-secondary p-10 flex flex-col items-start gap-5">
            <div className="font-mono uppercase tracking-[0.2em] text-[11px] text-onboarding-text-muted">
              §03 / Begin
            </div>
            <h2 className="font-display uppercase tracking-[0.02em] text-3xl md:text-4xl leading-tight text-onboarding-text-primary max-w-md">
              Ready to transform your game?
            </h2>
            <p className="font-serif text-base text-onboarding-text-muted leading-snug max-w-md">
              Hundreds of grapplers train smarter with personalized plans. Your turn.
            </p>
            <Link href="/onboarding">
              <button className="bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-xs px-6 py-3.5 inline-flex items-center gap-3 hover:opacity-90 transition-opacity">
                Start your journey <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
