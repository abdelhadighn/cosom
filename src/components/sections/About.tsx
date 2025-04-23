
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <img 
            src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
            alt="Consom Supermarché" 
            className="h-12 mb-6 mx-auto"
          />
          <h2 className="text-3xl font-bold mb-4">Chaque client est Roi</h2>
          <p className="text-lg text-gray-600 mb-8">
            Découvrez pourquoi des milliers de clients nous font confiance chaque jour pour leurs achats quotidiens.
            Venez nous rendre visite dans votre supermarché Consom le plus proche.
          </p>
          <Button variant="consom" size="lg" asChild>
            <Link to="/about">Découvrir Notre Histoire</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
