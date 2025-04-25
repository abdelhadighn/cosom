
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export default function Promotions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {
    fetchPromotedProducts();
  }, []);

  const fetchPromotedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_promoted', true);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les promotions",
        variant: "destructive",
      });
      return;
    }

    setPromotions(data || []);
  };

  const filteredPromotions = promotions.filter(promo => 
    promo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    promo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/071e5ffc-6682-4cb8-b028-b4409fc418e3.png"
          title="Promotions en Cours"
          description="Découvrez nos offres spéciales et économisez sur vos produits préférés"
          buttonText="Voir tous les produits"
          buttonUrl="/products"
        />
        
        <section className="py-12 bg-secondary">
          <div className="container">
            <div className="relative w-full max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Rechercher des promotions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {filteredPromotions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPromotions.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold">Aucune promotion trouvée</h3>
                <p className="text-muted-foreground mt-2">Essayez d'autres termes de recherche</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
