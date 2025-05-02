
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ProductForm } from "./products/ProductForm";
import { ProductList } from "./products/ProductList";

export function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    image_url: "",
    description: "",
    brand: "",
    price: "",
    is_promoted: false
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchProducts = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour gérer les produits",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive"
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category_id: product.category_id,
      image_url: product.image_url,
      description: product.description,
      brand: product.brand,
      price: product.price,
      is_promoted: product.is_promoted
    });
    setImagePreview(product.image_url);
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
        
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le produit",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Succès",
          description: "Produit supprimé avec succès"
        });
        fetchProducts();
      }
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        loading={loading}
        uploadingImage={uploadingImage}
        setUploadingImage={setUploadingImage}
        fetchProducts={fetchProducts}
      />

      <ProductList
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        categories={categories}
      />
    </div>
  );
}
