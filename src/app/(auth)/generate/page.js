"use client";
import { FileText, Workflow, Zap } from "lucide-react";

const TOOLS = [
  {
    n: "01",
    icon: FileText,
    label: "Content",
    title: "Generate writing",
    body: "Articles, blog posts, training notes.",
    cta: "Start writing",
  },
  {
    n: "02",
    icon: Workflow,
    label: "Plan",
    title: "Structure programs",
    body: "Drill blocks, training cycles, comp prep.",
    cta: "Create plan",
  },
];

export default function Generate() {
  return (
    <div className="min-h-[calc(100vh-3rem)] bg-onboarding-bg-primary">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-onboarding-text-muted mb-3">
            <span className="text-cinnabar">●</span> Generate
          </div>
          <h1 className="font-display uppercase tracking-[0.02em] text-4xl md:text-5xl leading-tight text-onboarding-text-primary mb-3">
            Build something.
          </h1>
          <p className="font-serif text-lg text-onboarding-text-muted leading-snug max-w-xl">
            AI-assisted tools for plans, drills, and content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-onboarding-border-subtle border border-onboarding-border-subtle mb-px">
          {TOOLS.map(({ n, icon: Icon, label, title, body, cta }) => (
            <div key={n} className="bg-onboarding-bg-primary p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-onboarding-text-muted">
                  {n} / {label}
                </span>
                <Icon className="h-4 w-4 text-onboarding-text-muted" strokeWidth={1.5} />
              </div>
              <h2 className="font-display uppercase tracking-[0.04em] text-xl text-onboarding-text-primary">
                {title}
              </h2>
              <p className="font-serif text-base text-onboarding-text-muted leading-snug">
                {body}
              </p>
              <button className="self-start mt-2 bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-[11px] px-5 py-3 hover:opacity-90 transition-opacity">
                {cta}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-onboarding-bg-secondary border border-onboarding-border-subtle border-t-0 p-7">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-cinnabar" strokeWidth={1.5} />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-onboarding-text-muted">
              03 / Quick generate
            </span>
          </div>
          <h2 className="font-display uppercase tracking-[0.04em] text-xl text-onboarding-text-primary mb-2">
            Drop a prompt.
          </h2>
          <p className="font-serif text-base text-onboarding-text-muted leading-snug mb-5">
            Describe what you need. Hit generate.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="e.g. half-guard drill block for blue belts…"
              maxLength={500}
              className="flex-1 bg-onboarding-bg-primary border border-onboarding-border-input text-onboarding-text-primary placeholder:text-onboarding-text-subtle px-4 py-3 focus:outline-none focus:border-onboarding-text-primary transition-colors"
            />
            <button className="bg-cinnabar text-onboarding-bg-primary font-mono uppercase tracking-[0.18em] text-[11px] px-6 py-3 hover:opacity-90 transition-opacity">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
