import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/*  Put the images in /public/images/categories/ (or change the paths) */
/* ------------------------------------------------------------------ */
const categories = [
  {
    name: "Chandeliers",
    href: "/categories/chandeliers",
    image: "/images/categories/chandeliers.jpg",
    alt: "Crystal chandelier",
  },
  {
    name: "Pendant Lights",
    href: "/categories/pendant-lights",
    image: "/images/categories/pendant-lights.jpg",
    alt: "Black pendant lights over a dining table",
  },
  {
    name: "Ceiling Lights",
    href: "/categories/ceiling-lights",
    image: "/images/categories/ceiling-lights.jpg",
    alt: "Round LED ceiling light",
  },
  {
    name: "Wall Lights",
    href: "/categories/wall-lights",
    image: "/images/categories/wall-lights.jpg",
    alt: "Modern wall sconce",
  },
  {
    name: "Table Lamps",
    href: "/categories/table-lamps",
    image: "/images/categories/table-lamps.jpg",
    alt: "Table lamp on a bedside table",
  },
  {
    name: "LED Lights",
    href: "/categories/led-lights",
    image: "/images/categories/led-lights.jpg",
    alt: "Warm LED strip light",
  },
  {
    name: "Track Lights",
    href: "/categories/track-lights",
    image: "/images/categories/track-lights.jpg",
    alt: "Black track spotlights",
  },
  {
    name: "Outdoor Lights",
    href: "/categories/outdoor-lights",
    image: "/images/categories/outdoor-lights.jpg",
    alt: "Lantern in a garden",
  },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export function CategorySection() {
  return (
    <section
      aria-labelledby="category-heading"
      className="bg-[#FBF9F4] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#18241F]/55 sm:text-[11px]">
              Shop by category
            </p>
            <h2
              id="category-heading"
              className="font-[family-name:var(--font-cormorant)] text-[1.75rem] font-medium leading-[1.05] tracking-[-0.03em] text-[#18241F] sm:text-4xl lg:text-[2.6rem]"
            >
              Lighting &amp; Electrical
              <br className="sm:hidden" /> Solutions
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-[11px] font-medium text-[#18241F]/70 transition-colors hover:text-[#C96B3C] sm:text-xs"
          >
            <span className="sm:hidden">View all</span>
            <span className="hidden sm:inline">View all categories</span>
            <ArrowRight
              size={14}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Grid: 2 columns on mobile, 4 on tablet/desktop */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-[#18241F]/10 bg-[#F8F4EA] transition-shadow duration-300 hover:shadow-[0_14px_34px_-18px_rgba(24,36,31,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123B32]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E9E3D3] sm:aspect-[3/2]">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 48vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Label */}
                <div className="flex flex-1 items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[12px] font-medium text-[#18241F] sm:text-sm">
                      {category.name}
                    </h3>
                    <span className="mt-1 hidden items-center gap-1 text-[11px] text-[#18241F]/55 sm:inline-flex">
                      Explore
                      <ArrowRight size={11} strokeWidth={1.6} />
                    </span>
                  </div>

                  <ArrowRight
                    size={14}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 text-[#18241F]/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#C96B3C]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}