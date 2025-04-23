
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  brand?: string;
  price?: string;
  isPromoted?: boolean;
}

export function ProductCard({ 
  id, 
  name, 
  category, 
  image, 
  description, 
  brand, 
  price, 
  isPromoted = false 
}: ProductCardProps) {
  return (
    <div className={`group rounded-lg overflow-hidden border ${isPromoted ? 'border-consom shadow-md' : 'border-gray-200'}`}>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {isPromoted && (
          <div className="absolute top-2 right-2 bg-consom text-white text-xs font-bold py-1 px-3 rounded-full">
            Promotion
          </div>
        )}
      </div>
      <div className="p-4">
        {brand && (
          <p className="text-xs text-gray-500 uppercase">{brand}</p>
        )}
        <h3 className="font-medium text-base mt-1">{name}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          {price && (
            <p className="font-medium">{price}</p>
          )}
          <Button variant="consomOutline" size="sm" asChild>
            <Link to={`/products/${category}/${id}`}>Détails</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
