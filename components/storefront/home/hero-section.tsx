"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
  Zap,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Lighting", href: "/categories/lighting" },
  { label: "Electricals", href: "/categories/electricals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Intro timing (ms) — same on every screen size                      */
/* ------------------------------------------------------------------ */
const TIMING = {
  lightUpAt: 4400, // bulb switches on (end of the dark + flicker phase)
  fadeOutAt: 5300, // dark overlay starts fading to reveal the hero
  removeAt: 6300, // overlay removed from the DOM
};

type Phase = "dark" | "lit" | "fading" | "done";

/* ------------------------------------------------------------------ */
/*  Intro (all screen sizes): dark screen + huge flickering bulb       */
/* ------------------------------------------------------------------ */
function LightIntro({ phase }: { phase: Phase }) {
  if (phase === "done") return null;

  const lit = phase === "lit" || phase === "fading";

  return (
    <div
      aria-hidden="true"
      className={`intro-root fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#07090A] transition-opacity duration-1000 ease-out ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Whole-screen warm wash when the light comes on */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          lit ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,214,102,0.55) 0%, rgba(255,214,102,0.18) 38%, transparent 70%)",
        }}
      />

      {/* ---------------- The bulb ---------------- */}
      <div className="relative flex flex-col items-center">
        {/* Outer glow (flickers, then bursts) */}
        <div
          className={`intro-glow absolute left-1/2 top-[38%] aspect-square w-[130vw] max-w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full ${
            lit ? "intro-glow-lit" : "intro-glow-flicker"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(255,214,102,0.9) 0%, rgba(255,190,70,0.45) 35%, rgba(255,170,40,0) 68%)",
          }}
        />

        {/* Glass */}
        <div className="relative aspect-square w-[min(62vw,42vh,380px)]">
          {/* Dark glass (always visible) */}
          <div
            className="absolute inset-0 rounded-full border border-white/10"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 45%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          {/* Lit glass (flickers, then stays on) */}
          <div
            className={`absolute inset-0 rounded-full ${
              lit ? "intro-glass-lit" : "intro-glass-flicker"
            }`}
            style={{
              background:
                "radial-gradient(circle at 50% 55%, #FFF6D0 0%, #FFE08A 38%, #FFC046 72%, #F0A020 100%)",
              boxShadow:
                "0 0 80px 20px rgba(255,200,80,0.55), inset 0 0 40px rgba(255,255,255,0.6)",
            }}
          />

          {/* Filament */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <path
              d="M42 100 L42 62 M58 100 L58 62"
              stroke="#6b6354"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <path
              d="M42 62 C42 54, 46 66, 50 58 C54 66, 58 54, 58 62"
              strokeWidth="2"
              strokeLinecap="round"
              className={lit ? "intro-filament-lit" : "intro-filament-flicker"}
              stroke="#8a7f68"
            />
          </svg>

          {/* Glass highlight */}
          <div className="absolute left-[16%] top-[12%] h-[26%] w-[16%] rotate-[28deg] rounded-full bg-white/25 blur-[3px]" />
        </div>

        {/* Neck + screw base */}
        <div className="-mt-[2px] h-[34px] w-[34%] rounded-b-md bg-gradient-to-b from-[#2b2f31] to-[#17191a]" />
        <div className="flex w-[40%] flex-col gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[9px] rounded-full bg-gradient-to-b from-[#4a4f52] to-[#1c1f21]"
            />
          ))}
          <div className="mx-auto h-[10px] w-[45%] rounded-b-full bg-[#0f1112]" />
        </div>
      </div>

      {/* ---------------- Brand name ---------------- */}
      <div
        className={`intro-text relative mt-10 px-6 text-center transition-colors duration-700 sm:mt-12 ${
          lit ? "text-[#FFE9A8]" : "text-white/40"
        }`}
        style={
          lit ? { textShadow: "0 0 28px rgba(255,214,102,0.85)" } : undefined
        }
      >
        <span className="block font-[family-name:var(--font-cormorant)] text-[clamp(3.4rem,17vw,6rem)] font-medium leading-[0.9] tracking-[-0.045em]">
          Easy
        </span>
        <span
          className={`mt-3 block pl-[0.55em] text-[clamp(0.75rem,3.4vw,1.05rem)] font-semibold uppercase tracking-[0.55em] transition-colors duration-700 ${
            lit ? "text-[#D6D95D]" : "text-white/40"
          }`}
        >
          Electrical
        </span>
      </div>

      {/* Component-scoped keyframes */}
      <style>{`
        .intro-root { --flicker-ms: ${TIMING.lightUpAt}ms; }

        /* Irregular flicker: on / off / on-off-on … like a faulty fitting */
        @keyframes intro-flicker {
          0%, 8%   { opacity: 0; }
          9%       { opacity: 0.85; }
          11%      { opacity: 0; }
          24%      { opacity: 0; }
          25%      { opacity: 0.6; }
          26%      { opacity: 0.05; }
          27%      { opacity: 0.9; }
          30%      { opacity: 0; }
          48%      { opacity: 0; }
          49%      { opacity: 0.45; }
          52%      { opacity: 0; }
          66%      { opacity: 0; }
          67%      { opacity: 1; }
          69%      { opacity: 0.1; }
          70%      { opacity: 0.8; }
          72%      { opacity: 0; }
          88%      { opacity: 0; }
          90%      { opacity: 0.7; }
          92%      { opacity: 0.1; }
          94%      { opacity: 0.95; }
          96%, 100% { opacity: 0.15; }
        }

        @keyframes intro-burst {
          0%   { opacity: 0.2; transform: translate(-50%, -50%) scale(0.7); }
          45%  { opacity: 1;   transform: translate(-50%, -50%) scale(1.25); }
          100% { opacity: 0.9; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes intro-lit-in {
          0%   { opacity: 0.2; }
          100% { opacity: 1; }
        }

        @keyframes intro-text-in {
          from { opacity: 0; filter: blur(8px); }
          to   { opacity: 1; filter: blur(0); }
        }

        .intro-glass-flicker,
        .intro-filament-flicker {
          opacity: 0;
          animation: intro-flicker var(--flicker-ms) linear forwards;
        }
        .intro-glow-flicker {
          opacity: 0;
          animation: intro-flicker var(--flicker-ms) linear forwards;
          /* keep the glow softer than the glass while flickering */
          filter: saturate(0.9);
        }

        .intro-glass-lit { animation: intro-lit-in 350ms ease-out forwards; }
        .intro-filament-lit {
          stroke: #fff;
          filter: drop-shadow(0 0 3px #fff);
        }
        .intro-glow-lit {
          animation: intro-burst 900ms ease-out forwards;
        }

        .intro-text {
          opacity: 0;
          animation: intro-text-in 1600ms ease-out 900ms forwards;
        }

        /* Respect reduced-motion: no flicker, just fade the light in */
        @media (prefers-reduced-motion: reduce) {
          .intro-glass-flicker,
          .intro-filament-flicker,
          .intro-glow-flicker {
            animation: none;
            opacity: 0;
          }
          .intro-glow-lit { animation: intro-lit-in 400ms ease-out forwards; transform: translate(-50%, -50%); }
          .intro-text { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("dark");

  // Run the intro timeline (once per browser session)
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("easy-intro-seen") === "1";
    } catch {
      /* storage unavailable — just play the intro */
    }

    if (seen) {
      setPhase("done");
      return;
    }

    const timers = [
      setTimeout(() => setPhase("lit"), TIMING.lightUpAt),
      setTimeout(() => setPhase("fading"), TIMING.fadeOutAt),
      setTimeout(() => {
        setPhase("done");
        try {
          sessionStorage.setItem("easy-intro-seen", "1");
        } catch {
          /* ignore */
        }
      }, TIMING.removeAt),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Lock page scroll while the intro is playing
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Hero text rises in as the light comes on
  const revealed = phase === "fading" || phase === "done";

  return (
    <>
      <LightIntro phase={phase} />

      <section className="relative isolate min-h-[760px] overflow-hidden bg-[#F5F1E8] sm:min-h-[780px]">
        {/* Desktop image */}
        <div className="absolute inset-0 -z-20 hidden lg:block">
          <Image
            src="/images/easy-hero.jpg"
            alt="Modern interior with elegant chandelier lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center]"
          />
        </div>

        {/* Mobile image */}
        <div className="absolute inset-0 -z-20 lg:hidden">
          <Image
            src="/images/mobile-hero.png"
            alt="Elegant lighting in a modern interior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Desktop overlays: left and right panels fade out toward the centre,
            so the middle of the photo stays fully clear.
            No overlay on mobile — the photo is fully visible. */}
        <div
          className="absolute inset-0 -z-10 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #F5F1E8 0%, rgba(245,241,232,0.96) 16%, rgba(245,241,232,0.78) 28%, rgba(245,241,232,0.25) 38%, transparent 46%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 hidden lg:block"
          style={{
            background:
              "linear-gradient(to left, #F5F1E8 0%, rgba(245,241,232,0.96) 16%, rgba(245,241,232,0.78) 28%, rgba(245,241,232,0.25) 38%, transparent 46%)",
          }}
        />

        {/* Navbar */}
        <header className="relative z-30 border-b border-[#18241F]/10 bg-[#F5F1E8]/65 backdrop-blur-md">
          <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between gap-4 px-5 sm:h-[76px] sm:px-8 lg:px-12">
            <Link
              href="/"
              aria-label="Easy-Electricals home"
              className="flex shrink-0 items-center gap-2"
            >
              <Zap
                className="h-7 w-7 fill-[#D6D95D] text-[#123B32] sm:h-8 sm:w-8"
                strokeWidth={1.6}
              />
              <span className="text-sm font-bold tracking-[-0.04em] text-[#18241F] sm:text-base">
                EASY-ELECTRICALS
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-5 xl:flex 2xl:gap-7"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] font-medium text-[#18241F] transition-colors hover:text-[#C96B3C]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Header actions */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-5">
              <Link
                href="/search"
                aria-label="Search"
                className="hidden text-[#18241F] transition-colors hover:text-[#C96B3C] sm:inline-flex"
              >
                <Search size={19} strokeWidth={1.5} />
              </Link>

              <Link
                href="/account"
                aria-label="My account"
                className="hidden text-[#18241F] transition-colors hover:text-[#C96B3C] sm:inline-flex"
              >
                <UserRound size={19} strokeWidth={1.5} />
              </Link>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative text-[#18241F] transition-colors hover:text-[#C96B3C]"
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#123B32] px-1 text-[9px] text-white">
                  0
                </span>
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="text-[#18241F] transition-colors hover:text-[#C96B3C] xl:hidden"
              >
                {menuOpen ? (
                  <X size={23} strokeWidth={1.5} />
                ) : (
                  <Menu size={23} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {menuOpen && (
            <nav
              aria-label="Mobile navigation"
              className="absolute left-0 right-0 top-full border-t border-[#18241F]/10 bg-[#F5F1E8]/95 px-5 py-3 shadow-xl backdrop-blur-xl xl:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#18241F]/10 py-3.5 text-sm font-medium text-[#18241F] last:border-0"
                >
                  {link.label}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </nav>
          )}
        </header>

        {/* Hero content */}
        <div className="mx-auto flex min-h-[692px] max-w-[1600px] items-end justify-between gap-8 px-4 pb-5 pt-14 sm:min-h-[704px] sm:px-8 sm:pb-8 lg:px-12 lg:pb-16">
          {/* Left block (on mobile this is a transparent frosted-glass card at the bottom) */}
          <div
            className={`w-full text-left transition-all duration-1000 ease-out max-lg:mx-auto max-lg:max-w-[560px] max-lg:rounded-[28px] max-lg:border max-lg:border-white/40 max-lg:bg-[#F5F1E8]/25 max-lg:p-6 max-lg:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] max-lg:backdrop-blur-md lg:w-[28%] lg:max-w-[460px] ${
              revealed ? "" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#123B32] sm:text-xs lg:mb-5">
              Lighting &amp; Electricals
            </p>

            <h1 className="font-[family-name:var(--font-cormorant)] text-[3rem] font-medium leading-[0.86] tracking-[-0.055em] text-[#18241F] lg:text-[clamp(3rem,4.6vw,5rem)]">
              Light Up
              <br />
              Every Room
            </h1>

            <p className="mt-4 max-w-[470px] text-sm leading-6 text-[#30382F] lg:mt-6 lg:text-[15px] lg:leading-7">
              Chandeliers, pendants and more, delivered nationwide.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 lg:mt-6">
              <Link
                href="/categories/lighting"
                className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-[#123B32] px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#1D5144]"
              >
                Shop Lighting
                <ArrowRight
                  size={17}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              {/* Mobile only: the right-hand block's button joins the card */}
              <Link
                href="/categories/electricals"
                className="inline-flex min-h-12 items-center rounded-full border border-[#123B32] px-6 py-3 text-sm font-medium text-[#123B32] transition-colors duration-300 hover:bg-[#123B32] hover:text-white lg:hidden"
              >
                Electricals
              </Link>
            </div>
          </div>

          {/* Right block (large screens only) */}
          <div
            className={`hidden text-right transition-all duration-1000 ease-out lg:block lg:w-[28%] lg:max-w-[460px] ${
              revealed ? "" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.19em] text-[#123B32]">
              Electrical Supplies
            </p>

            <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(3rem,4.6vw,5rem)] font-medium leading-[0.86] tracking-[-0.055em] text-[#18241F]">
              Wired Right
              <br />
              Every Time
            </h2>

            <p className="ml-auto mt-6 max-w-[470px] text-[15px] leading-7 text-[#30382F]">
              Cables, switches and breakers you can trust.
            </p>

            <div className="mt-6 flex justify-end">
              <Link
                href="/categories/electricals"
                className="group inline-flex min-h-12 items-center gap-4 rounded-full border border-[#123B32] px-6 py-3 text-sm font-medium text-[#123B32] transition-colors duration-300 hover:bg-[#123B32] hover:text-white"
              >
                Shop Electricals
                <ArrowRight
                  size={17}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}