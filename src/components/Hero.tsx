
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface HeroProps {
  title?: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonUrl?: string;
  overlay?: boolean;
}

export function Hero({
  title = "Bienvenue chez Consom",
  description = "Vos produits préférés, tout près.",
  image,
  buttonText = "Découvrir nos produits",
  buttonUrl = "/products",
  overlay = true,
}: HeroProps) {
  return (
    <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
      <img
        src={image}
        alt="Consom Supermarché"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}
      <div className="container relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl max-w-xl mb-8">{description}</p>
        <Button variant="consom" size="xl" asChild className="text-white">
          <Link to={buttonUrl}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
