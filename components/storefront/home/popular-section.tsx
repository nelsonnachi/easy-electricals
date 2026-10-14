"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Products                                                           */
/*  Put the images in /public/images/products/ (or change the paths)   */
/* ------------------------------------------------------------------ */
type Badge = "New" | "Bestseller";

type Product = {
  id: string;
  name: string;
  price: number; // in naira
  rating: number;
  reviews: number;
  image: string;
  href: string;
  badge?: Badge;
};

const products: Product[] = [
  {
    id: "modern-crystal-chandelier",
    name: "Modern Crystal Chandelier",
    price: 285000,
    rating: 4.8,
    reviews: 24,
    image: "/images/categories/chandeliers.jpg",
    href: "/shop/modern-crystal-chandelier",
    badge: "New",
  },
  {
    id: "pendant-light-matte-black",
    name: "Pendant Light (Matte Black)",
    price: 42000,
    rating: 4.7,
    reviews: 18,
    image: "/images/categories/pendant-lights.jpg",
    href: "/shop/pendant-light-matte-black",
    badge: "Bestseller",
  },
  {
    id: "led-ceiling-light-round",
    name: "LED Ceiling Light (Round)",
    price: 65000,
    rating: 4.6,
    reviews: 12,
    image: "/images/categories/led-lights.jpg",
    href: "/shop/led-ceiling-light-round",
    badge: "New",
  },
  {
    id: "wall-sconce-light",
    name: "Wall Sconce Light",
    price: 28000,
    rating: 4.5,
    reviews: 10,
    image: "/images/categories/wall-lights.jpg",
    href: "/shop/wall-sconce-light",
  },
  {
    id: "luxury-floor-lamp",
    name: "Luxury Floor Lamp",
    price: 98000,
    rating: 4.8,
    reviews: 16,
    image: "/images/categories/outdoor-lights.jpg",
    href: "/shop/luxury-floor-lamp",
  },
];

const badgeStyles: Record<Badge, string> = {
  New: "bg-[#123B32] text-white",
  Bestseller: "bg-[#B8862F] text-white",
};

const formatPrice = (price: number) => `₦${price.toLocaleString("en-NG")}`;

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */
function Rating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rated ${rating} out of 5 from ${reviews} reviews`}
    >
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={11}
            strokeWidth={1.4}
            className={
              n <= Math.round(rating)
                ? "fill-[#D9A441] text-[#D9A441]"
                : "fill-transparent text-[#18241F]/25"
            }
          />
        ))}
      </div>
      <span className="text-[10px] text-[#18241F]/55 sm:text-[11px]">
        {rating} ({reviews})
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/*  Optional: pass onAddToCart to hook up your cart logic              */
/* ------------------------------------------------------------------ */
export function PopularThisWeek({
  onAddToCart,
}: {
  onAddToCart?: (product: Product) => void;
}) {
  return (
    <section
      aria-labelledby="popular-heading"
      className="bg-[#FBF9F4] pb-10 sm:pb-14 lg:pb-16"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#18241F]/55 sm:text-[11px]">
              Best sellers
            </p>
            <h2
              id="popular-heading"
              className="font-[family-name:var(--font-cormorant)] text-[1.75rem] font-medium leading-[1.05] tracking-[-0.03em] text-[#18241F] sm:text-4xl lg:text-[2.6rem]"
            >
              Popular This Week
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-[11px] font-medium text-[#18241F]/70 transition-colors hover:text-[#C96B3C] sm:text-xs"
          >
            <span className="sm:hidden">View all</span>
            <span className="hidden sm:inline">View all products</span>
            <ArrowRight
              size={14}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile: stacked rows. Tablet: 3 columns. Desktop: 5 columns. */}
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5">
          {products.map((product) => (
            <li key={product.id}>
              <article className="flex h-full items-center gap-3 overflow-hidden rounded-md border border-[#18241F]/10 bg-[#F8F4EA] p-2.5 sm:flex-col sm:items-stretch sm:gap-0 sm:p-0">
                {/* Image (links to the product) */}
                <Link
                  href={product.href}
                  aria-label={product.name}
                  className="group relative block h-[84px] w-[84px] shrink-0 overflow-hidden rounded bg-[#E9E3D3] sm:aspect-[5/4] sm:h-auto sm:w-full sm:rounded-none"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 84px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.badge && (
                    <span
                      className={`absolute left-1.5 top-1.5 rounded-[3px] px-1.5 py-0.5 text-[9px] font-semibold leading-none ${
                        badgeStyles[product.badge]
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Details + add to cart */}
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:w-full sm:flex-none sm:flex-col sm:items-stretch sm:gap-0 sm:p-3.5">
                  <div className="min-w-0 flex-1 sm:flex-none">
                    <h3 className="text-[12px] font-medium leading-snug text-[#18241F] sm:text-[13px]">
                      <Link
                        href={product.href}
                        className="transition-colors hover:text-[#C96B3C]"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[#18241F] sm:text-[15px]">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-1.5">
                      <Rating
                        rating={product.rating}
                        reviews={product.reviews}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart?.(product)}
                    aria-label={`Add ${product.name} to cart`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#18241F]/15 text-[#18241F] transition-colors duration-300 hover:border-[#123B32] hover:bg-[#123B32] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123B32] sm:mt-3.5 sm:h-10 sm:w-full sm:text-xs sm:font-medium"
                  >
                    <ShoppingCart
                      size={16}
                      strokeWidth={1.5}
                      className="sm:hidden"
                    />
                    <span className="hidden sm:inline">Add to cart</span>
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}