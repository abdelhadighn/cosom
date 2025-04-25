
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/sections/Features";
import { Categories } from "@/components/sections/Categories";
import { Promotions } from "@/components/sections/Promotions";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { About } from "@/components/sections/About";

export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/images/hero-bg.png"
          title="La qualité à portée de main"
          description="tous les jours."
        />
        <Features />
        <Categories />
        <Promotions />
        <FeaturedProducts />
        <About />
      </main>
      <Footer />
    </>
  );
}
