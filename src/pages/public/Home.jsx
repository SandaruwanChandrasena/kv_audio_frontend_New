import Reveal from "../../components/common/Reveal.jsx";

import HeroSection from "./home/HeroSection.jsx";
import FeaturedCategories from "./home/FeaturedCategories.jsx";
import WhyChooseUs from "./home/WhyChooseUs.jsx";
import PopularProducts from "./home/PopularProducts.jsx";
import HowItWorks from "./home/HowItWorks.jsx";
import Testimonials from "./home/Testimonials.jsx";

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />

      <Reveal>
        <FeaturedCategories />
      </Reveal>

      <Reveal>
        <WhyChooseUs />
      </Reveal>

      <Reveal>
        <PopularProducts />
      </Reveal>

      <Reveal>
        <HowItWorks />
      </Reveal>

      <Reveal>
        <Testimonials />
      </Reveal>
    </div>
  );
}
