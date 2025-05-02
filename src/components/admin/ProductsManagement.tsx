
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Search, Upload, Image as ImageIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    image_url: "",
    description: "",
    brand: "",
    price: "",
    is_promoted: false
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `products/${fileName}`;

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

    console.log("Submitting product with data:", formData);

    // Make sure category_id is not empty
    if (!formData.category_id) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie",
        variant: "destructive"
      });
      setLoading(false);
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get category name by id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Non catégorisé";
  };

  return (
    <div className="space-y-8">
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

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Liste des produits</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold mt-2">{product.price}</p>
              <p className="text-sm text-gray-600">Catégorie: {getCategoryName(product.category_id)}</p>
              <div className="mt-4 flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => handleEdit(product)}
                >
                  Modifier
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(product.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-500">
                Essayez d'autres termes de recherche
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
