
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  image_url: string;
  brand: string;
  price: string;
  description: string;
  category_id: string;
  is_promoted: boolean;
}

export default function ProductCategory() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (category) {
      fetchProducts();
      fetchCategoryName();
    }
  }, [category]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category);

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const fetchCategoryName = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .eq('id', category)
      .maybeSingle();

    if (!error && data) {
      setCategoryName(data.name);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/3b91bcdc-2342-4e1c-b170-5bb9ecddfb49.png"
          title={`Nos ${categoryName}`}
          description="Découvrez notre sélection de produits de qualité"
          overlay={true}
        />

        <section className="py-16 bg-gray-50">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Aucun produit trouvé dans cette catégorie
                </h3>
                <p className="text-gray-500">
                  Veuillez réessayer plus tard ou contacter notre équipe.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
