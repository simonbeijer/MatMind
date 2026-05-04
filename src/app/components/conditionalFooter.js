"use client";
import { usePathname } from "next/navigation";

export default function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/") return null;

  return (
    <footer className="border-t border-onboarding-border-subtle bg-onboarding-bg-primary mt-auto">
      <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-onboarding-text-muted">
          © 2025 Mat Mind / Built for grapplers, by grapplers.
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-onboarding-text-muted">
          v0.1 — beta
        </p>
      </div>
    </footer>
  );
}
