import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export function CategoriesManagement() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<any>(null);
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
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
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
                }}
              >
                Annuler
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Liste des catégories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
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
