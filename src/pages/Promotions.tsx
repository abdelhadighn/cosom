import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Promotions() {
  const [promotedProducts, setPromotedProducts] = useState<any[]>([]);
  const [productOfMonth, setProductOfMonth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPromotedProducts();
    fetchProductOfMonth();
  }, []);

  const fetchPromotedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_promoted', true);

    if (!error && data) {
      setPromotedProducts(data);
    }
    setLoading(false);
  };

  const fetchProductOfMonth = async () => {
    const { data: monthData, error: monthError } = await supabase
      .from('product_of_month')
      .select(`
        *,
        product:products(*)
      `)
      .limit(1)
      .single();

    if (!monthError && monthData) {
      setProductOfMonth({
        ...monthData.product,
        regularPrice: monthData.regular_price
      });
    }
  };

  const filteredProducts = promotedProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/images/promotions-bg.png"
          title="Promotions en Cours"
          description="Découvrez nos offres spéciales et économisez sur vos produits préférés"
          buttonText="Voir tous les produits"
          buttonUrl="/products"
        />

        <section className="py-8 bg-white border-b">
          <div className="container">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {productOfMonth && (
          <section className="py-16 bg-white">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Produit du Mois</h2>
              <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-full">
                    <img 
                      src={productOfMonth.image_url} 
                      alt={productOfMonth.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 bg-consom text-white text-xs font-semibold rounded-full mb-4">
                      Exclusivité
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{productOfMonth.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{productOfMonth.brand}</p>
                    <p className="text-gray-700 mb-6">{productOfMonth.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold text-consom">{productOfMonth.price}</p>
                      <span className="text-sm text-gray-500">Prix normal: {productOfMonth.regularPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Offres Spéciales</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Profitez de nos promotions limitées dans le temps. Offres valables jusqu'à épuisement des stocks.
            </p>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-500">
                  Essayez d'autres termes de recherche
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 text-gray-700" 
                  onClick={() => setSearchTerm("")}
                >
                  Réinitialiser la recherche
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container">
            <div className="bg-consom/10 rounded-lg p-8 border border-consom/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Comment bénéficier de nos promotions</h2>
                <p className="text-gray-700 mb-6">
                  Nos promotions sont disponibles directement en magasin, sans coupon ni carte de fidélité nécessaire. 
                  Les prix affichés sont déjà réduits pour vous faire profiter immédiatement des économies.
                </p>
                <p className="text-gray-700">
                  Rendez-vous dans votre supermarché Consom le plus proche pour découvrir encore plus d'offres exclusives!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
