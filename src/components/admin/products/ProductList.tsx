
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductListProps {
  products: any[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleEdit: (product: any) => void;
  handleDelete: (productId: string) => void;
  categories: any[];
}

export function ProductList({
  products,
  searchTerm,
  setSearchTerm,
  handleEdit,
  handleDelete,
  categories
}: ProductListProps) {
  
  // Filter products based on search term
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
  );
}
