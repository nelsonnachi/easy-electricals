import { CategorySection } from '@/components/storefront/home/category-section'
import { FeaturedCollection } from '@/components/storefront/home/featured-collection-section'
import { Footer } from '@/components/storefront/home/footer'
import { HeroSection } from '@/components/storefront/home/hero-section'
import { PopularThisWeek } from '@/components/storefront/home/popular-section'
import { PromoCards } from '@/components/storefront/home/promo-cards-section'

const page = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedCollection />
      <PopularThisWeek />
      <PromoCards />
      <Footer />
    </div>
  )
}

export default page