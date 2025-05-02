
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CategoryListProps {
  categories: any[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleEdit: (category: any) => void;
  handleDelete: (categoryId: string) => void;
}

export function CategoryList({
  categories,
  searchTerm,
  setSearchTerm,
  handleEdit,
  handleDelete
}: CategoryListProps) {
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        {filteredCategories.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Aucune catégorie trouvée
            </h3>
            <p className="text-gray-500">
              Essayez d'autres termes de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
