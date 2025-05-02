
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/sections/Features";
import { Categories } from "@/components/sections/Categories";
import { Promotions } from "@/components/sections/Promotions";
import { NewProducts } from "@/components/sections/NewProducts";
import { About } from "@/components/sections/About";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/3b91bcdc-2342-4e1c-b170-5bb9ecddfb49.png"
          title="La qualité à portée de main"
          description="tous les jours."
        />
        <Features />
        <Categories />
        <NewProducts />
        <Promotions />
        <About />
      </main>
      <Footer />
    </>
  );
}
