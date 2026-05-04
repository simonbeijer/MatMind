import Link from "next/link";

const ROMAN = ["I.", "II.", "III.", "IV.", "V."];
const RINGS = [
  "Earth · belt",
  "Water · consistency",
  "Fire · focus",
  "Wind · voices",
  "Void · plan",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bone text-ink font-sans relative overflow-hidden">
      {/* double frame */}
      <div className="absolute inset-3 sm:inset-6 border border-ink pointer-events-none" />
      <div className="absolute inset-4 sm:inset-8 border border-ink-faint pointer-events-none" />

      {/* top masthead */}
      <div
        className="absolute left-5 right-5 top-7 sm:left-[60px] sm:right-[60px] sm:top-[50px] flex justify-between gap-3 font-mono uppercase text-ink-soft"
        style={{ fontSize: 10, letterSpacing: "0.2em" }}
      >
        <span>MatMind</span>
        <span className="hidden md:inline">Established 2026 · Issue No. 001</span>
        <span>For the practitioner</span>
      </div>

      {/* left side rail — stacked roman numerals (V in red) */}
      <div
        className="hidden md:flex absolute left-[24px] lg:left-[80px] top-[120px] flex-col font-serif italic"
        style={{
          gap: 14,
          fontSize: 40,
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {ROMAN.map((r, i) => (
          <span key={r} className={i === 4 ? "text-cinnabar" : "text-ink"}>
            {r}
          </span>
        ))}
      </div>

      {/* right side rail — section labels */}
      <div
        className="hidden md:flex absolute right-[24px] lg:right-[80px] top-1/2 -translate-y-1/2 flex-col text-right font-mono uppercase"
        style={{ gap: 22, fontSize: 9, letterSpacing: "0.22em" }}
      >
        {RINGS.map((label, i) => (
          <span
            key={label}
            className={i === 4 ? "text-cinnabar" : "text-ink-soft"}
          >
            {label}
          </span>
        ))}
      </div>

      {/* center — eyebrow + wordmark + tagline + CTA */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4"
        style={{ width: "min(760px, 100%)" }}
      >
        <div
          className="font-mono uppercase text-ink-soft"
          style={{
            fontSize: "clamp(9px, 2.4vw, 11px)",
            letterSpacing: "0.32em",
            marginBottom: 30,
          }}
        >
          ⎯⎯⎯⎯⎯ &nbsp; A handbook for the rolling life &nbsp; ⎯⎯⎯⎯⎯
        </div>

        <div className="relative inline-block">
          <h1
            className="m-0"
            style={{
              fontFamily: 'var(--font-serif-raw), "Times New Roman", Georgia, serif',
              fontWeight: 300,
              fontSize: "clamp(72px, 18vw, 168px)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              fontVariationSettings: '"opsz" 144',
            }}
          >
            <span style={{ display: "inline-block", transform: "skewX(-10deg)" }}>Mat</span>Mind
          </h1>
          <div
            className="absolute bg-cinnabar rounded-full"
            style={{
              top: "7%",
              right: "clamp(-28px, -3vw, -12px)",
              width: "clamp(8px, 1.4vw, 12px)",
              height: "clamp(8px, 1.4vw, 12px)",
            }}
          />
        </div>

        <div
          className="font-serif italic mx-auto text-ink"
          style={{
            marginTop: 22,
            fontSize: "clamp(15px, 3.6vw, 21px)",
            fontWeight: 300,
            lineHeight: 1.5,
            maxWidth: 600,
          }}
        >
          The plan you train, the mind you bring, and the body you keep — in
          one journal, written in your own hand.
        </div>

        <div
          className="flex justify-center items-center"
          style={{ gap: 18, marginTop: 36 }}
        >
          <div className="bg-ink hidden sm:block" style={{ width: 64, height: 1 }} />
          <div className="bg-ink sm:hidden" style={{ width: 32, height: 1 }} />
          <span
            className="font-mono uppercase text-ink-soft"
            style={{ fontSize: 10, letterSpacing: "0.32em" }}
          >
            Begin
          </span>
          <div className="bg-ink hidden sm:block" style={{ width: 64, height: 1 }} />
          <div className="bg-ink sm:hidden" style={{ width: 32, height: 1 }} />
        </div>

        <Link href="/login" className="inline-block" style={{ marginTop: 22 }}>
          <button
            className="bg-ink text-bone font-mono uppercase cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap px-7 py-3 sm:px-11 sm:py-[14px]"
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              border: "none",
            }}
          >
            Open the journal &nbsp; →
          </button>
        </Link>
      </div>

      {/* bottom rule */}
      <div
        className="absolute left-5 right-5 bottom-7 sm:left-[60px] sm:right-[60px] sm:bottom-[50px] flex justify-between gap-3 font-mono uppercase text-ink-soft"
        style={{ fontSize: 10, letterSpacing: "0.2em" }}
      >
        <span className="hidden sm:inline">
          I. Earth &nbsp; · &nbsp; II. Water &nbsp; · &nbsp; III. Fire &nbsp; ·
          &nbsp; IV. Wind &nbsp; · &nbsp;{" "}
          <span className="text-cinnabar">V. Void</span>
        </span>
        <span className="sm:hidden">
          I · II · III · IV · <span className="text-cinnabar">V</span>
        </span>
        <span>—— five voices, one practice ——</span>
      </div>
    </div>
  );
}
