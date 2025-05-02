
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CategoryForm } from "./categories/CategoryForm";
import { CategoryList } from "./categories/CategoryList";

export function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image_url: "",
    product_count: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour gérer les catégories",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        products (count)
      `)
      .order('name');

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive"
      });
    } else if (data) {
      const categoriesWithCount = data.map(category => ({
        ...category,
        product_count: category.products[0]?.count || 0
      }));
      setCategories(categoriesWithCount);
    }
    setLoading(false);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      image_url: category.image_url,
      product_count: category.product_count
    });
    setImagePreview(category.image_url);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) return;

    setLoading(true);
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès"
      });
      fetchCategories();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <CategoryForm
        formData={formData}
        setFormData={setFormData}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
        loading={loading}
        uploadingImage={uploadingImage}
        setUploadingImage={setUploadingImage}
        fetchCategories={fetchCategories}
      />

      <CategoryList
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}
