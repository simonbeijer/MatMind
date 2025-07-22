"use client";
import { usePathname } from "next/navigation";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <footer className="border-t border-onboarding-border-subtle bg-onboarding-bg-primary/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-onboarding-text-muted">
          &copy; 2025 MatMind. Built for grapplers, by grapplers.
        </p>
      </div>
    </footer>
  );
}