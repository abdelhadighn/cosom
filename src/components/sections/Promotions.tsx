
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function Promotions() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-consom to-consom-dark p-8 md:p-12">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <ShoppingCart className="w-full h-full" />
          </div>
          
          <div className="relative z-10 max-w-2xl text-white">
            <h2 className="text-3xl font-bold mb-4">Promotions de la Semaine</h2>
            <p className="text-white/90 text-lg mb-6">
              Découvrez notre sélection de produits à prix réduits. Offres valables jusqu'à épuisement des stocks.
            </p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-consom" asChild>
              <Link to="/promotions">Voir les promotions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
