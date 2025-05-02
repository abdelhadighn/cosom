
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Search, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    setUploadingImage(true);
    
    try {
      // Upload image to Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('product_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('product_images')
        .getPublicUrl(filePath);

      // Update the form data with the image URL
      setFormData({ ...formData, image_url: publicUrl });
      setImagePreview(publicUrl);
      
      toast({
        title: "Image téléchargée",
        description: "L'image a été téléchargée avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: `Impossible de télécharger l'image: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour gérer les catégories",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    const operation = editingCategory 
      ? supabase.from('categories').update(formData).eq('id', editingCategory.id)
      : supabase.from('categories').insert([formData]);

    const { error } = await operation;

    if (error) {
      toast({
        title: "Erreur",
        description: `Impossible de ${editingCategory ? 'modifier' : 'ajouter'} la catégorie`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: `Catégorie ${editingCategory ? 'modifiée' : 'ajoutée'} avec succès`
      });
      setFormData({
        name: "",
        slug: "",
        image_url: "",
        product_count: 0
      });
      setImagePreview(null);
      setEditingCategory(null);
      fetchCategories();
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">
          {editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la catégorie</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="image_upload">Image de la catégorie</Label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
                    <Input
                      id="image_upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label 
                      htmlFor="image_upload" 
                      className="flex flex-col items-center cursor-pointer py-4 px-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {uploadingImage ? "Téléchargement en cours..." : "Cliquez pour télécharger une image"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">PNG, JPG ou GIF</span>
                    </Label>
                  </div>
                  {formData.image_url && (
                    <Input
                      type="text"
                      value={formData.image_url}
                      className="mt-2"
                      readOnly
                    />
                  )}
                </div>
                {imagePreview && (
                  <div className="w-24 h-24 relative border rounded-md overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading || uploadingImage}>
              {loading ? "En cours..." : editingCategory ? "Modifier" : "Ajouter"}
            </Button>
            {editingCategory && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setEditingCategory(null);
                  setFormData({
                    name: "",
                    slug: "",
                    image_url: "",
                    product_count: 0
                  });
                  setImagePreview(null);
                }}
              >
                Annuler
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Liste des catégories</h2>
          <div className="max-w-xs w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="border p-4 rounded-lg">
              <img 
                src={category.image_url} 
                alt={category.name} 
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-bold">{category.name}</h3>
              <p className="text-sm text-gray-600">Slug: {category.slug}</p>
              <p className="text-sm text-gray-600">
                {category.product_count} produit{category.product_count !== 1 ? 's' : ''}
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleEdit(category)}
                >
                  Modifier
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(category.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
