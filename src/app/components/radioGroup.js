"use client";
import React from "react";

export default function RadioGroup({ name, options, selected, onChange, label }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <p className="block text-sm font-medium text-onboarding-text-primary mb-2">{label}</p>}
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-3 cursor-pointer mb-2">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 text-onboarding-accent-end bg-onboarding-card-bg border-onboarding-border-input rounded focus:ring-onboarding-accent-end focus:ring-2"
          />
          <span className="text-sm text-onboarding-text-primary">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
