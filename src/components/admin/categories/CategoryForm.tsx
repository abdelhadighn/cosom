
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

interface CategoryFormProps {
  formData: {
    name: string;
    slug: string;
    image_url: string;
    product_count: number;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    slug: string;
    image_url: string;
    product_count: number;
  }>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  editingCategory: any;
  setEditingCategory: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  uploadingImage: boolean;
  setUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCategories: () => Promise<void>;
}

export function CategoryForm({
  formData,
  setFormData,
  imagePreview,
  setImagePreview,
  editingCategory,
  setEditingCategory,
  loading,
  uploadingImage,
  setUploadingImage,
  fetchCategories
}: CategoryFormProps) {
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    setUploadingImage(true);
    
    try {
      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
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
    
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Non authentifié",
        description: "Veuillez vous connecter pour gérer les catégories",
        variant: "destructive"
      });
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
  };

  return (
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
  );
}
