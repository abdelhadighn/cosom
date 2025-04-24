
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
      fetchCategoryName();
      fetchProducts();
    }
  }, [category]);

  const fetchProducts = async () => {
    console.log("Fetching products for category slug:", category);
    
    try {
      // First get the category ID from the slug
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .maybeSingle();
        
      if (categoryError) {
        console.error("Error fetching category ID:", categoryError);
        toast({
          title: "Erreur",
          description: "Impossible de charger la catégorie",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      if (!categoryData) {
        console.log("No category found with slug:", category);
        setLoading(false);
        return;
      }
      
      console.log("Found category with ID:", categoryData.id, "for slug:", category);
      
      // Then fetch products with that category ID
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryData.id);

      if (productsError) {
        console.error("Error fetching products:", productsError);
        toast({
          title: "Erreur",
          description: "Impossible de charger les produits",
          variant: "destructive",
        });
      } else if (productsData) {
        console.log("Products found:", productsData.length, productsData);
        setProducts(productsData);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
    
    setLoading(false);
  };

  const fetchCategoryName = async () => {
    console.log("Fetching category name for slug:", category);
    
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .eq('slug', category)
      .maybeSingle();

    if (error) {
      console.error("Error fetching category name:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le nom de la catégorie",
        variant: "destructive",
      });
    }
    
    if (data) {
      console.log("Category name found:", data.name);
      setCategoryName(data.name);
    } else {
      console.log("No category name found");
      setCategoryName("");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/3b91bcdc-2342-4e1c-b170-5bb9ecddfb49.png"
          title={categoryName ? `Nos ${categoryName}` : "Catégorie"}
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
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    description={product.description}
                    image_url={product.image_url}
                    is_promoted={product.is_promoted}
                    category_id={product.category_id}
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
