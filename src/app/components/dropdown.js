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
        className="flex items-center p-2 rounded-full hover:bg-onboarding-hover-bg transition-colors duration-200" 
        onClick={toggleDropdown}
      >
        <UserCircleIcon className="h-8 w-8 text-onboarding-text-muted"></UserCircleIcon>
      </button>
      <div
        className={`transition-all duration-300 transform absolute right-0 mt-2 p-4 border rounded-lg shadow-lg text-right bg-onboarding-card-bg text-onboarding-text-primary border-onboarding-border-subtle min-w-[150px] ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {user ? (
          <>
            <p className="text-sm font-medium mb-2">{user.name}</p>
            <button
              className="text-sm text-onboarding-accent-end hover:text-onboarding-accent-end/80 font-medium transition-colors duration-200"
              onClick={logoutUser}
            >
              Logout
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
