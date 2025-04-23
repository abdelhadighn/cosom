
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export function PromotionsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [promotedProducts, setPromotedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const [productsResponse, promotedResponse] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('products').select('*').eq('is_promoted', true)
    ]);

    if (productsResponse.error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive"
      });
    } else {
      setProducts(productsResponse.data || []);
    }

    if (promotedResponse.error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les promotions",
        variant: "destructive"
      });
    } else {
      setPromotedProducts(promotedResponse.data || []);
    }
    
    setLoading(false);
  };

  const togglePromotion = async (productId: string, currentlyPromoted: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_promoted: !currentlyPromoted })
      .eq('id', productId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la promotion",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: `Produit ${currentlyPromoted ? 'retiré des' : 'ajouté aux'} promotions`
      });
      fetchProducts();
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Gérer les promotions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-lg font-semibold mt-2">{product.price}</p>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant={product.is_promoted ? "outline" : "consom"}
                  onClick={() => togglePromotion(product.id, product.is_promoted)}
                >
                  {product.is_promoted ? "Retirer des promotions" : "Mettre en promotion"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Produits en promotion</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotedProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-lg font-semibold mt-2">{product.price}</p>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline"
                  onClick={() => togglePromotion(product.id, true)}
                >
                  Retirer des promotions
                </Button>
              </div>
            </div>
          ))}
          {promotedProducts.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Aucun produit en promotion
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
