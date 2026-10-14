"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/*  Put the images in /public/images/promos/ (or change the paths)     */
/* ------------------------------------------------------------------ */
const lightingCard = {
  title: "Lighting for Every Mood",
  text: "From warm and cozy to bright and vibrant — find the perfect lighting for every space.",
  cta: "Explore Lighting",
  href: "/categories/lighting",
  image: "/images/categories/lighting-mood.jpg",
  alt: "Warm bedroom lighting with a bedside lamp",
};

const smallCards = [
  {
    title: "Electrical Accessories",
    text: "Switches, sockets & more",
    href: "/categories/electrical-accessories",
    image: "/images/categories/electrical-accessories.jpg",
    alt: "Wall switch and socket",
  },
  {
    title: "Power & Backup",
    text: "Inverters, batteries & UPS",
    href: "/categories/power-backup",
    image: "/images/categories/power-backup.jpg",
    alt: "Inverter and backup power unit",
  },
];

// Mobile accordion rows
const accordionItems = [
  {
    title: "Lighting",
    text: "Chandeliers, pendants, ceiling lights and more.",
    href: "/categories/lighting",
  },
  {
    title: "Electrical Accessories",
    text: "Switches, sockets & more",
    href: "/categories/electrical-accessories",
  },
  {
    title: "Power & Backup",
    text: "Inverters, batteries & UPS",
    href: "/categories/power-backup",
  },
];

/* ------------------------------------------------------------------ */
/*  Mobile accordion                                                   */
/* ------------------------------------------------------------------ */
function MobileAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-5 border-t border-[#18241F]/10 sm:hidden">
      {accordionItems.map((item, index) => {
        const open = openIndex === index;
        const panelId = `promo-panel-${index}`;

        return (
          <div key={item.title} className="border-b border-[#18241F]/10">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#123B32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123B32]"
            >
              {item.title}
              {open ? (
                <Minus size={16} strokeWidth={1.6} aria-hidden="true" />
              ) : (
                <Plus size={16} strokeWidth={1.6} aria-hidden="true" />
              )}
            </button>

            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex items-center justify-between gap-4 pb-4">
                  <p className="text-[13px] text-[#30382F]">{item.text}</p>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#123B32] hover:text-[#C96B3C]"
                  >
                    Shop now
                    <ArrowRight
                      size={13}
                      strokeWidth={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export function PromoCards() {
  return (
    <section
      aria-label="More ways to shop"
      className="bg-[#FBF9F4] pb-10 sm:pb-14 lg:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* Mobile: banner only. Tablet: banner on top, 2 cards below.
            Desktop: three cards in one row. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-5">
          {/* Lighting banner (image background) */}
          <div className="relative isolate flex min-h-[170px] items-center overflow-hidden rounded-md bg-[#1A1510] sm:col-span-2 sm:min-h-[210px] lg:col-span-1 lg:min-h-[240px]">
            <Image
              src={lightingCard.image}
              alt={lightingCard.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-20 object-cover object-[75%_center]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(18,12,8,0.88) 0%, rgba(18,12,8,0.6) 38%, rgba(18,12,8,0.1) 70%, rgba(18,12,8,0) 100%)",
              }}
            />

            <div className="px-5 py-6 sm:px-9 sm:py-8">
              <h2 className="max-w-[240px] font-[family-name:var(--font-cormorant)] text-[1.6rem] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1E8] sm:max-w-[320px] sm:text-4xl">
                {lightingCard.title}
              </h2>

              <p className="mt-3 hidden max-w-[300px] text-sm leading-6 text-[#F5F1E8]/80 sm:block">
                {lightingCard.text}
              </p>

              <Link
                href={lightingCard.href}
                className="group mt-4 inline-flex min-h-10 items-center gap-3 rounded-full border border-[#F5F1E8]/70 px-4 py-2 text-xs font-medium text-[#F5F1E8] transition-colors duration-300 hover:bg-[#F5F1E8] hover:text-[#18241F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] sm:mt-5 sm:px-5 sm:text-[13px]"
              >
                {lightingCard.cta}
                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Smaller cards (hidden on mobile, where the accordion takes over) */}
          {smallCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative hidden min-h-[210px] overflow-hidden rounded-md border border-[#18241F]/10 bg-[#F1ECDF] p-6 sm:block lg:min-h-[240px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123B32]"
            >
              <div className="relative z-10 max-w-[58%]">
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-[#18241F] lg:text-[1.7rem]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[13px] leading-5 text-[#30382F]">
                  {card.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-[#123B32] transition-colors group-hover:text-[#C96B3C] sm:text-[13px]">
                  Shop now
                  <ArrowRight
                    size={14}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>

              {/* Product image, anchored bottom-right */}
              <div className="absolute bottom-3 right-3 h-[62%] w-[44%]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 12vw, 22vw"
                  className="object-contain object-right-bottom transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>

        <MobileAccordion />
      </div>
    </section>
  );
}