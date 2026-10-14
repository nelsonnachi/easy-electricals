import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Featured collection banner                                         */
/*  Image: /public/images/featured-chandeliers.jpg                     */
/*  Tip: use a wide photo with the chandelier on the RIGHT, so the     */
/*  dark text side on the left stays clean.                            */
/* ------------------------------------------------------------------ */
export function FeaturedCollection() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="bg-[#FBF9F4] pb-10 sm:pb-14 lg:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="relative isolate flex min-h-[190px] items-center overflow-hidden rounded-md bg-[#0E1412] sm:min-h-[300px] lg:min-h-[360px]">
          {/* Background image */}
          <Image
            src="/images/chandelier-banner.jpg"
            alt="Modern ring chandeliers in a dark, elegant interior"
            fill
            sizes="(min-width: 1400px) 1300px, 100vw"
            className="-z-20 object-cover object-[72%_center] sm:object-center"
          />

          {/* Dark gradient so the text stays readable and the right side
              of the photo stays clear */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(10,14,12,0.92) 0%, rgba(10,14,12,0.78) 30%, rgba(10,14,12,0.35) 58%, rgba(10,14,12,0) 80%)",
            }}
          />

          {/* Content */}
          <div className="w-full px-5 py-6 sm:px-10 sm:py-10 lg:px-14">
            <p className="mb-3 hidden text-[10px] font-semibold uppercase tracking-[0.19em] text-[#F5F1E8]/70 sm:block sm:text-[11px]">
              Featured collection
            </p>

            <h2
              id="featured-heading"
              className="max-w-[260px] font-[family-name:var(--font-cormorant)] text-[1.5rem] font-medium leading-[1.02] tracking-[-0.03em] text-[#F5F1E8] sm:max-w-[420px] sm:text-4xl lg:max-w-[480px] lg:text-[3rem]"
            >
              Modern Chandeliers
              <br />
              for Stunning Spaces
            </h2>

            <p className="mt-4 hidden max-w-[360px] text-sm leading-6 text-[#F5F1E8]/80 sm:block lg:text-[15px] lg:leading-7">
              Make a statement with our premium chandelier collection — timeless
              designs for modern living.
            </p>

            <Link
              href="/categories/chandeliers"
              className="group mt-4 inline-flex min-h-10 items-center gap-3 rounded-full border border-[#F5F1E8]/70 px-4 py-2 text-xs font-medium text-[#F5F1E8] transition-colors duration-300 hover:bg-[#F5F1E8] hover:text-[#18241F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] sm:mt-6 sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm"
            >
              Shop Chandeliers
              <ArrowRight
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}