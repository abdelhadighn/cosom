
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";

// Sample products data - in a real application, this would come from an API
const productsByCategory = {
  "nettoyants-multi-usages": [
    {
      id: 1,
      name: "Nettoyant Multi-Usage Citron",
      category: "nettoyants-multi-usages",
      image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab",
      description: "Nettoyant efficace avec une fraîche odeur de citron.",
      brand: "Clean Plus",
      price: "3,99 €"
    },
    {
      id: 2,
      name: "Spray Désinfectant",
      category: "nettoyants-multi-usages",
      image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69",
      description: "Spray désinfectant pour toutes les surfaces.",
      brand: "Clean Plus",
      price: "4,50 €"
    }
  ],
  "fruits-legumes": [
    {
      id: 1,
      name: "Pommes Bio",
      category: "fruits-legumes",
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c",
      description: "Pommes bio fraîches de producteurs locaux.",
      brand: "Bio Local",
      price: "2,99 €/kg"
    }
  ]
};

const getCategoryName = (slug: string) => {
  const names: { [key: string]: string } = {
    "nettoyants-multi-usages": "Nettoyants Multi-usages",
    "entretien-maison": "Entretien Maison",
    "papier-menager": "Papier Ménager",
    "petit-dejeuner": "Petit Déjeuner",
    "fruits-legumes": "Fruits et Légumes",
    "boissons": "Boissons",
  };
  return names[slug] || slug;
};

export default function ProductCategory() {
  const { category } = useParams();
  const products = category ? productsByCategory[category] || [] : [];
  const categoryName = category ? getCategoryName(category) : "";

  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/3b91bcdc-2342-4e1c-b170-5bb9ecddfb49.png"
          title={`Nos ${categoryName}`}
          description="Découvrez notre sélection de produits de qualité"
          overlay={true}
        />

        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Aucun produit trouvé dans cette catégorie
                  </h3>
                  <p className="text-gray-500">
                    Veuillez réessayer plus tard ou contacter notre équipe.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
