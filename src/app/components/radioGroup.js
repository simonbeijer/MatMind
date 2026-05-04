"use client";
import React from "react";

export default function RadioGroup({ name, options, selected, onChange, label }) {
  return (
    <div className="flex flex-col mb-4 space-y-2">
      {label && (
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-onboarding-text-muted mb-1">
          {label}
        </p>
      )}
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 accent-cinnabar"
          />
          <span className="font-serif text-sm text-onboarding-text-primary">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
