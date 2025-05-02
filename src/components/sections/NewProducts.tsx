
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function NewProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    // Calculate date for one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gte('created_at', oneWeekAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(4);

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  if (products.length === 0 && !loading) {
    return null; // Don't show section if no new products
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Nouveaux Produits</h2>
          <Button variant="outline" asChild className="flex items-center">
            <Link to="/products">
              Tous les produits
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
