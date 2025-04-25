
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Rechercher des promotions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button 
                variant="blue" 
                onClick={() => setSearchQuery("")}
                className="md:w-auto"
              >
                Réinitialiser
              </Button>
            </div>
            
            {filteredPromotions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPromotions.map((promotion) => (
                  <div key={promotion.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                      <img 
                        src={promotion.image_url} 
                        alt={promotion.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-consom text-white font-bold px-2 py-1 rounded-md">
                        Promotion
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{promotion.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{promotion.description}</p>
                      <p className="text-lg font-bold text-consom">{promotion.price} DH</p>
                      <Button variant="blue" className="mt-3 w-full">
                        En profiter
                      </Button>
                    </div>
                  </div>
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
