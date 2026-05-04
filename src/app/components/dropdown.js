"use client";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Spinner from "./spinner";

export default function Dropdown({ user, logoutUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 7000);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="flex items-center p-1.5 hover:bg-onboarding-hover-bg transition-colors duration-150"
        onClick={toggleDropdown}
      >
        <UserCircleIcon className="h-7 w-7 text-onboarding-text-muted" />
      </button>
      <div
        className={`transition-all duration-150 transform absolute right-0 mt-2 p-4 border bg-onboarding-bg-secondary text-onboarding-text-primary border-onboarding-border-subtle min-w-[180px] text-right ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {user ? (
          <>
            <p className="font-mono uppercase tracking-[0.15em] text-[10px] text-onboarding-text-muted mb-1">
              Signed in as
            </p>
            <p className="font-display uppercase tracking-[0.04em] text-sm mb-3 truncate">
              {user.name}
            </p>
            <button
              className="font-mono uppercase tracking-[0.18em] text-[11px] text-cinnabar hover:opacity-80 transition-opacity"
              onClick={logoutUser}
            >
              Log out →
            </button>
          </>
        ) : (
          <div className="h-[60px] w-[60px] flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
