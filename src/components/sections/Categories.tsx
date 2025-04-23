
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Nos Familles de Produits</h2>
          <Button variant="outline" asChild className="flex items-center">
            <Link to="/products">
              Voir tout
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map(category => (
            <CategoryCard
              key={category.id}
              name={category.name}
              slug={category.slug}
              image={category.image}
              productCount={category.productCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
