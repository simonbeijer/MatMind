"use client";
import { useUserContext } from "@/app/context/userContext";

export default function Generate() {
  const { user } = useUserContext();

  return (
    <div className="h-[calc(100vh-3rem)] bg-gradient-to-br from-onboarding-bg-primary via-onboarding-bg-secondary to-onboarding-bg-primary flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-4xl mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-onboarding-text-primary mb-2">Generate Your Plan</h1>
          <p className="text-onboarding-text-muted">Create personalized plans and content using AI assistance.</p>
        </div>

        <div className="bg-onboarding-card-bg rounded-lg shadow-sm border border-onboarding-border-subtle backdrop-blur-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-xl font-semibold text-onboarding-text-primary">AI Generation Tools</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-onboarding-bg-secondary rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-semibold text-onboarding-text-primary">Content Generation</span>
              </div>
              <p className="text-onboarding-text-muted mb-4">Generate articles, blog posts, and written content.</p>
              <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-4 py-2 rounded-lg font-medium">
                Start Writing
              </button>
            </div>

            <div className="bg-onboarding-bg-secondary rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-5 h-5 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="font-semibold text-onboarding-text-primary">Plan Creation</span>
              </div>
              <p className="text-onboarding-text-muted mb-4">Create structured plans for projects and goals.</p>
              <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-4 py-2 rounded-lg font-medium">
                Create Plan
              </button>
            </div>
          </div>

          <div className="bg-onboarding-bg-secondary rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-onboarding-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-semibold text-onboarding-text-primary">Quick Generate</span>
            </div>
            <p className="text-onboarding-text-muted mb-4">Enter a prompt to generate content instantly</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Describe what you want to generate..." 
                maxLength={500}
                className="flex-1 bg-onboarding-card-bg border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-3 py-2 rounded-md focus:ring-2 focus:ring-onboarding-accent-end"
              />
              <button className="bg-gradient-to-r from-onboarding-accent-start to-onboarding-accent-end hover:from-onboarding-accent-start/80 hover:to-onboarding-accent-end/80 text-onboarding-bg-primary px-6 py-2 rounded-lg font-medium">
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}