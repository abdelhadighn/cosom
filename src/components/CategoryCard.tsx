
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

export function CategoryCard({ name, slug, image, productCount }: CategoryCardProps) {
  return (
    <Link 
      to={`/products/${slug}`}
      className="group relative rounded-lg overflow-hidden h-48 hover:shadow-md transition-shadow"
    >
      <img 
        src={image} 
        alt={name} 
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
        <h3 className="font-medium text-lg">{name}</h3>
        {typeof productCount === 'number' && (
          <p className="text-sm text-white/80">
            {productCount} {productCount > 1 ? 'produits' : 'produit'}
          </p>
        )}
      </div>
    </Link>
  );
}
