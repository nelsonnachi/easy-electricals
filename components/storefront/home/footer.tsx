"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Clock,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Plus,
  Minus,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */
const brands = [
  { name: "PHILIPS", className: "text-[15px] font-bold tracking-[0.14em]" },
  { name: "legrand", className: "text-xl font-extrabold tracking-tight" },
  { name: "Schneider Electric", className: "text-sm font-semibold" },
  { name: "OSRAM", className: "text-[15px] font-medium tracking-[0.12em]" },
  { name: "ABB", className: "text-2xl font-black tracking-tight" },
  { name: "HAVELLS", className: "text-[15px] font-semibold tracking-[0.1em]" },
];

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Lighting", href: "/categories/lighting" },
  { label: "Electricals", href: "/categories/electricals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Special Offers", href: "/offers" },
];

const careLinks = [
  { label: "Track Order", href: "/track-order" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Social icons (inline SVG so nothing depends on your lucide version) */
/* ------------------------------------------------------------------ */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden="true">
    <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.6V13h2.7v8h3.2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[17px] w-[17px]" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]" aria-hidden="true">
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-[18px] w-[18px]" aria-hidden="true">
    <path d="M22 8.2c-.2-1-.9-1.7-1.9-1.9C18.4 6 12 6 12 6s-6.4 0-8.1.3C2.9 6.5 2.2 7.2 2 8.2 1.7 9.9 1.7 12 1.7 12s0 2.1.3 3.8c.2 1 .9 1.7 1.9 1.9C5.6 18 12 18 12 18s6.4 0 8.1-.3c1-.2 1.7-.9 1.9-1.9.3-1.7.3-3.8.3-3.8s0-2.1-.3-3.8z" />
    <path d="M10 9.5v5l4.3-2.5L10 9.5z" fill="currentColor" stroke="none" />
  </svg>
);

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: <FacebookIcon /> },
  { label: "Instagram", href: "https://instagram.com", icon: <InstagramIcon /> },
  { label: "X (Twitter)", href: "https://x.com", icon: <XIcon /> },
  { label: "YouTube", href: "https://youtube.com", icon: <YouTubeIcon /> },
];

/* ------------------------------------------------------------------ */
/*  Trusted brands strip (hidden on mobile, like the design)           */
/* ------------------------------------------------------------------ */
function TrustedBrands() {
  return (
    <section
      aria-label="Trusted brands"
      className="hidden bg-[#FBF9F4] sm:block"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 border-t border-[#18241F]/10 px-8 py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#18241F]/55">
          Trusted brands
        </p>

        <ul className="flex flex-1 flex-wrap items-center justify-between gap-x-10 gap-y-4 text-[#18241F]/75">
          {brands.map((brand) => (
            <li key={brand.name} className={brand.className}>
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Newsletter band (hidden on mobile, like the design)                */
/* ------------------------------------------------------------------ */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send `email` to your newsletter service / API route here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative hidden overflow-hidden bg-[#123B32] sm:block"
      style={{
        backgroundImage:
          "radial-gradient(circle at 12% 120%, rgba(214,217,93,0.16) 0%, transparent 45%), radial-gradient(circle at 92% -20%, rgba(255,255,255,0.08) 0%, transparent 40%)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-12">
        <div className="max-w-[460px]">
          <h2
            id="newsletter-heading"
            className="font-[family-name:var(--font-cormorant)] text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-[#F5F1E8] lg:text-[2.2rem]"
          >
            Stay in the Light
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-[#F5F1E8]/75">
            Get the latest products, offers and lighting ideas delivered to your
            inbox.
          </p>
        </div>

        <div className="w-full lg:max-w-[520px]">
          <form
            onSubmit={handleSubmit}
            className="flex overflow-hidden rounded-md border border-[#F5F1E8]/25 bg-white"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[#18241F] placeholder:text-[#18241F]/45 focus:outline-none"
            />
            <button
              type="submit"
              className="group inline-flex shrink-0 items-center gap-2 bg-[#1D5144] px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#0D2D26] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#D6D95D]"
            >
              Subscribe
              <ArrowRight
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>

          <p
            role="status"
            className="mt-2 min-h-5 text-xs text-[#D6D95D]"
          >
            {subscribed ? "Thanks for subscribing. Check your inbox soon." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer column: accordion on mobile, always open from sm up         */
/* ------------------------------------------------------------------ */
function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 sm:border-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between py-4 text-left text-[13px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D6D95D] sm:pointer-events-none sm:py-0 sm:pb-5"
        >
          {title}
          <span className="sm:hidden" aria-hidden="true">
            {open ? <Minus size={16} strokeWidth={1.6} /> : <Plus size={16} strokeWidth={1.6} />}
          </span>
        </button>
      </h3>

      <div className={`${open ? "block" : "hidden"} pb-5 sm:block sm:pb-0`}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Payment methods                                                    */
/* ------------------------------------------------------------------ */
function PaymentMethods() {
  return (
    <ul
      aria-label="Accepted payment methods"
      className="flex flex-wrap items-center gap-x-6 gap-y-3"
    >
      <li aria-label="Visa" className="text-lg font-black italic tracking-tight text-white">
        VISA
      </li>

      <li aria-label="Mastercard" className="relative h-6 w-10">
        <span className="absolute left-0 top-0 h-6 w-6 rounded-full bg-[#EB001B]" />
        <span className="absolute right-0 top-0 h-6 w-6 rounded-full bg-[#F79E1B] opacity-90" />
      </li>

      <li aria-label="Verve" className="text-base font-extrabold italic tracking-tight text-[#F26B3A]">
        Verve
      </li>

      <li aria-label="Bank transfer" className="flex items-center gap-1.5 text-white/80">
        <Landmark size={18} strokeWidth={1.5} aria-hidden="true" />
        <span className="text-[9px] font-medium leading-[1.1]">
          Bank
          <br />
          Transfer
        </span>
      </li>
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export function Footer() {
  return (
    <>
      <TrustedBrands />
      <Newsletter />

      <footer className="bg-[#101614] text-[#F5F1E8]">
        <div className="mx-auto max-w-[1400px] px-5 pb-6 pt-10 sm:px-8 sm:pt-12 lg:px-12">
          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-3 sm:gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
            {/* Brand block */}
            <div className="mb-6 sm:col-span-3 sm:mb-0 lg:col-span-1">
              <Link
                href="/"
                aria-label="Easy-Electricals home"
                className="inline-flex items-center gap-2"
              >
                <Zap
                  className="h-7 w-7 fill-[#D6D95D] text-[#D6D95D]"
                  strokeWidth={1.6}
                />
                <span className="text-sm font-bold tracking-[-0.04em] text-white sm:text-base">
                  EASY-ELECTRICALS
                </span>
              </Link>

              <p className="mt-4 hidden max-w-[300px] text-[13px] leading-6 text-[#F5F1E8]/70 sm:block">
                Your trusted partner for quality electrical products and modern
                lighting solutions. Light up your world.
              </p>

              <ul className="mt-5 flex items-center gap-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#F5F1E8]/85 transition-colors duration-300 hover:border-[#D6D95D] hover:text-[#D6D95D]"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop */}
            <FooterGroup title="Shop">
              <ul className="space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#F5F1E8]/70 transition-colors hover:text-[#D6D95D]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>

            {/* Customer care */}
            <FooterGroup title="Customer Care">
              <ul className="space-y-3">
                {careLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#F5F1E8]/70 transition-colors hover:text-[#D6D95D]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterGroup>

            {/* Get in touch */}
            <FooterGroup title="Get in Touch">
              <ul className="space-y-3.5 text-[13px] text-[#F5F1E8]/70">
                <li className="flex items-start gap-3">
                  <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#D6D95D]" aria-hidden="true" />
                  <span>Lagos, Nigeria</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#D6D95D]" aria-hidden="true" />
                  <a
                    href="mailto:hello@easy-electricals.ng"
                    className="transition-colors hover:text-[#D6D95D]"
                  >
                    hello@easy-electricals.ng
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#D6D95D]" aria-hidden="true" />
                  <a
                    href="tel:+2348012345678"
                    className="transition-colors hover:text-[#D6D95D]"
                  >
                    +234 801 234 5678
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#D6D95D]" aria-hidden="true" />
                  <span>Mon - Sat, 8am - 6pm (WAT)</span>
                </li>
              </ul>
            </FooterGroup>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#F5F1E8]/55">
              © 2026 Easy-Electricals. All rights reserved.
            </p>
            <PaymentMethods />
          </div>
        </div>
      </footer>
    </>
  );
}