import { Route, Routes } from "react-router-dom"
import Products from "./Products"
import HeroSection from "./home/HeroSection"
import FeaturedCategories from "./home/FeaturedCategories"
import WhyChooseUs from "./home/WhyChooseUs"
import HowItWorks from "./home/HowItWorks"
import PopularProducts from "./home/PopularProducts"
import Testimonials from "./home/Testimonials"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCategories/>
      <PopularProducts />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </div>
  )
}
