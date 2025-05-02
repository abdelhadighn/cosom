
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  formData: {
    name: string;
    category_id: string;
    image_url: string;
    description: string;
    brand: string;
    price: string;
    is_promoted: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    category_id: string;
    image_url: string;
    description: string;
    brand: string;
    price: string;
    is_promoted: boolean;
  }>>;
  categories: any[];
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  editingProduct: any;
  setEditingProduct: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  uploadingImage: boolean;
  setUploadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProducts: () => Promise<void>;
}

export function ProductForm({
  formData,
  setFormData,
  categories,
  imagePreview,
  setImagePreview,
  editingProduct,
  setEditingProduct,
  loading,
  uploadingImage,
  setUploadingImage,
  fetchProducts
}: ProductFormProps) {

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `products/${fileName}`;

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
    
    console.log("Submitting product with data:", formData);

    // Make sure category_id is not empty
    if (!formData.category_id) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie",
        variant: "destructive"
      });
      return;
    }

    const operation = editingProduct 
      ? supabase.from('products').update(formData).eq('id', editingProduct.id)
      : supabase.from('products').insert([formData]);

    const { error, data } = await operation;

    if (error) {
      console.error("Error submitting product:", error);
      toast({
        title: "Erreur",
        description: `Impossible de ${editingProduct ? 'modifier' : 'ajouter'} le produit`,
        variant: "destructive"
      });
    } else {
      console.log("Product submitted successfully:", data);
      toast({
        title: "Succès",
        description: `Produit ${editingProduct ? 'modifié' : 'ajouté'} avec succès`
      });
      setFormData({
        name: "",
        category_id: "",
        image_url: "",
        description: "",
        brand: "",
        price: "",
        is_promoted: false
      });
      setImagePreview(null);
      setEditingProduct(null);
      fetchProducts();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="image_upload">Image du produit</Label>
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
          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={loading || uploadingImage}>
            {loading ? "En cours..." : editingProduct ? "Modifier" : "Ajouter"}
          </Button>
          {editingProduct && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  name: "",
                  category_id: "",
                  image_url: "",
                  description: "",
                  brand: "",
                  price: "",
                  is_promoted: false
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
