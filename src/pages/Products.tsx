
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        products (count)
      `);

    if (!error && data) {
      const categoriesWithCount = data.map(category => ({
        ...category,
        product_count: category.products[0]?.count || 0
      }));
      setCategories(categoriesWithCount);
    }
    setLoading(false);
  };
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
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
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
              </div>
            ) : filteredCategories.length === 0 ? (
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
                    image={category.image_url}
                    productCount={category.product_count}
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
