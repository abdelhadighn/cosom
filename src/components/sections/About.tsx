import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <section className="py-16 bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <img 
            src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
            alt="Consom Supermarché" 
            className="h-12 mb-6 mx-auto"
          />
          <h2 className="text-3xl font-bold mb-4">Qualité et fraîcheur garanties</h2>
          <p className="text-muted-foreground mb-8">
            Consom Supermarché s'engage à offrir des produits de qualité 
            et un service exceptionnel à tous nos clients. Depuis plus de 15 ans, 
            nous sélectionnons avec soin chaque produit pour garantir fraîcheur et qualité.
          </p>
          <Link to="/products">
            <Button variant="consomOutline" size="lg" className="text-consom border-white hover:bg-white border-consom ">
              Explorer le catalogue <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
