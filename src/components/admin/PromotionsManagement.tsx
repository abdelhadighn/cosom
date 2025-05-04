
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function PromotionsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [promotedProducts, setPromotedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
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
        console.error("Error fetching products:", productsResponse.error);
      } else {
        setProducts(productsResponse.data || []);
      }

      if (promotedResponse.error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les promotions",
          variant: "destructive"
        });
        console.error("Error fetching promotions:", promotedResponse.error);
      } else {
        setPromotedProducts(promotedResponse.data || []);
      }
    } catch (err) {
      console.error("Unexpected error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const openPromotionDialog = (product: any) => {
    setSelectedProduct(product);
    setNewPrice(product.price);
    setIsPromotionDialogOpen(true);
  };

  const handlePromotionSubmit = async () => {
    if (!selectedProduct) return;
    
    try {
      // Store the original price before promotion
      const originalPrice = selectedProduct.price;
      
      // Create a simpler update object
      const updateData = { 
        is_promoted: true,
        price: newPrice
      };
      
      // Only store original price if it doesn't exist yet
      if (!selectedProduct.original_price) {
        updateData['original_price'] = originalPrice;
      }

      console.log("Updating product with data:", updateData);
      
      const { error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', selectedProduct.id);

      if (error) {
        console.error("Update promotion error:", error);
        toast({
          title: "Erreur",
          description: "Impossible de modifier la promotion: " + error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Succès",
          description: `Prix promotionnel mis à jour avec succès`
        });
        setIsPromotionDialogOpen(false);
        await fetchProducts(); // Refresh data after update
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite: " + err.message,
        variant: "destructive"
      });
    }
  };

  const togglePromotion = async (productId: string, currentlyPromoted: boolean) => {
    if (currentlyPromoted) {
      // Remove from promotions
      try {
        const { error } = await supabase
          .from('products')
          .update({ 
            is_promoted: false,
            price: selectedProduct?.original_price || selectedProduct?.price
          })
          .eq('id', productId);

        if (error) {
          console.error("Remove promotion error:", error);
          toast({
            title: "Erreur",
            description: "Impossible de modifier la promotion: " + error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Succès",
            description: `Produit retiré des promotions`
          });
          await fetchProducts(); // Refresh data after update
        }
      } catch (err: any) {
        console.error("Unexpected error:", err);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite: " + err.message,
          variant: "destructive"
        });
      }
    } else {
      // Find the product to promote
      const product = products.find(p => p.id === productId);
      if (product) {
        openPromotionDialog(product);
      }
    }
  };

  // Update the ProductCard component too to ensure consistency
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
              <div className="mt-2">
                {product.is_promoted ? (
                  <>
                    <p className="text-red-500 line-through">{product.original_price || product.price} DA</p>
                    <p className="text-green-600 font-semibold">{product.price} DA</p>
                  </>
                ) : (
                  <p className="text-lg font-semibold">{product.price} DA</p>
                )}
              </div>
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
              <div className="mt-2">
                {product.is_promoted ? (
                  <>
                    <p className="text-red-500 line-through">{product.original_price || product.price} DA</p>
                    <p className="text-green-600 font-semibold">{product.price} DA</p>
                  </>
                ) : (
                  <p className="text-lg font-semibold">{product.price} DA</p>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => openPromotionDialog(product)}
                >
                  Modifier le prix
                </Button>
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

      {/* Promotion Dialog */}
      <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Définir le prix promotionnel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="original-price">Prix original</Label>
              <Input
                id="original-price"
                value={selectedProduct?.original_price || selectedProduct?.price}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-price">Nouveau prix</Label>
              <Input
                id="new-price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Entrez le nouveau prix"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromotionDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handlePromotionSubmit}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
