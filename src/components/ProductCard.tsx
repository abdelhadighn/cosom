
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string | number;
  name: string;
  category_id?: string;
  category?: string;
  image_url?: string;
  image?: string;
  description: string;
  brand?: string;
  price?: string;
  isPromoted?: boolean;
  is_promoted?: boolean;
}

export function ProductCard({ 
  name, 
  image, 
  image_url,
  description, 
  brand, 
  price, 
  isPromoted = false,
  is_promoted = false
}: ProductCardProps) {
  // Use either is_promoted or isPromoted, whichever is available
  const promoted = isPromoted || is_promoted;
  // Use either image or image_url, whichever is available
  const imageSource = image || image_url;
  
  return (
    <div className={`group rounded-lg overflow-hidden border ${promoted ? 'border-consom shadow-md' : 'border-gray-200'}`}>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={imageSource} 
          alt={name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {promoted && (
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
        
        {price && (
          <p className="font-medium mt-4">{price}</p>
        )}
      </div>
    </div>
  );
}
