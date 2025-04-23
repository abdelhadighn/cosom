
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Define product categories
const productCategories = [
  {
    id: 1,
    name: "Nettoyants Multi-usages",
    slug: "nettoyants-multi-usages",
    image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 12
  },
  {
    id: 2,
    name: "Entretien Maison",
    slug: "entretien-maison",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 18
  },
  {
    id: 3,
    name: "Papier Ménager",
    slug: "papier-menager",
    image: "https://images.unsplash.com/photo-1597348989645-46b190ce4918?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 10
  },
  {
    id: 4,
    name: "Produits pour Bébé",
    slug: "produits-bebe",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 15
  },
  {
    id: 5,
    name: "Petit Déjeuner",
    slug: "petit-dejeuner",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 20
  },
  {
    id: 6,
    name: "Sucreries et Chips",
    slug: "sucreries-chips",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 25
  },
  {
    id: 7,
    name: "Pâtes et Légumes Secs",
    slug: "pates-legumes-secs",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 22
  },
  {
    id: 8,
    name: "Conserves",
    slug: "conserves",
    image: "https://images.unsplash.com/photo-1589557909147-c22e2ea19561?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 18
  },
  {
    id: 9,
    name: "Produits Bio",
    slug: "produits-bio",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 15
  },
  {
    id: 10,
    name: "Épices et Olives",
    slug: "epices-olives",
    image: "https://images.unsplash.com/photo-1532336414791-78b63e1bcd24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 10
  },
  {
    id: 11,
    name: "Viandes et Volailles",
    slug: "viandes-volailles",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 14
  },
  {
    id: 12,
    name: "Aides à la Pâtisserie",
    slug: "aides-patisserie",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 8
  },
  {
    id: 13,
    name: "Jus et Laits",
    slug: "jus-laits",
    image: "https://images.unsplash.com/photo-1576186726125-9f5a2d8764be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 12
  },
  {
    id: 14,
    name: "Huiles",
    slug: "huiles",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 6
  },
  {
    id: 15,
    name: "Cosmétiques et Confort Maison",
    slug: "cosmetiques-confort-maison",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 20
  },
  {
    id: 16,
    name: "Fruits et Légumes",
    slug: "fruits-legumes",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 30
  },
  {
    id: 17,
    name: "Boissons Non Alcoolisées",
    slug: "boissons-non-alcoolisees",
    image: "https://images.unsplash.com/photo-1605548110006-81689df24fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 15
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter categories based on search term
  const filteredCategories = productCategories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/446fff40-8567-4519-81af-c1a4b93829cb.png"
          title="Nos Familles de Produits"
          description="Découvrez notre large gamme de produits de qualité"
        />

        {/* Search Section */}
        <section className="py-8 bg-white border-b">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher une catégorie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Aucune catégorie trouvée</h3>
                <p className="text-gray-500">Essayez d'autres termes de recherche</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => setSearchTerm("")}
                >
                  Réinitialiser la recherche
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map(category => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    slug={category.slug}
                    image={category.image}
                    productCount={category.productCount}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Comment naviguer nos produits</h2>
                <p className="text-gray-600 mb-6">
                  Cliquez sur une catégorie pour découvrir tous les produits correspondants. 
                  Vous pouvez également utiliser la barre de recherche pour trouver rapidement 
                  la catégorie qui vous intéresse.
                </p>
                <div className="flex justify-center">
                  <img 
                    src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
                    alt="Consom Supermarché" 
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
