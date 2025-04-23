
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Clock, MapPin, ArrowRight } from "lucide-react";

// Sample product category data - in a real application, you would fetch this from an API
const categories = [
  {
    id: 1,
    name: "Nettoyants Multi-usages",
    slug: "nettoyants-multi-usages",
    image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 12
  },
  {
    id: 2,
    name: "Entretien Maison",
    slug: "entretien-maison",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 18
  },
  {
    id: 3,
    name: "Papier Ménager",
    slug: "papier-menager",
    image: "https://images.unsplash.com/photo-1597348989645-46b190ce4918?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 10
  },
  {
    id: 4,
    name: "Petit Déjeuner",
    slug: "petit-dejeuner",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 20
  },
  {
    id: 5,
    name: "Fruits et Légumes",
    slug: "fruits-legumes",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 30
  },
  {
    id: 6,
    name: "Boissons",
    slug: "boissons",
    image: "https://images.unsplash.com/photo-1605548110006-81689df24fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    productCount: 25
  },
];

// Sample featured products data - in a real application, you would fetch this from an API
const featuredProducts = [
  {
    id: 1,
    name: "Lait Entier Bio",
    category: "boissons",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Lait entier bio de fermes locales, riche en calcium et en nutriments essentiels.",
    brand: "Ferme Bio",
    price: "2,49 €",
    isPromoted: true
  },
  {
    id: 2,
    name: "Pain Complet",
    category: "petit-dejeuner",
    image: "https://images.unsplash.com/photo-1565181821057-a3004db0fe41?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Pain complet aux céréales, cuit au four à bois selon les traditions artisanales.",
    brand: "Boulangerie Traditionnelle",
    price: "3,20 €",
    isPromoted: true
  },
  {
    id: 3,
    name: "Tablette de Chocolat Noir",
    category: "sucreries-chips",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Chocolat noir 70% de cacao, élaboré à partir de fèves sélectionnées pour leur arôme.",
    brand: "Chocolatier Gourmet",
    price: "2,95 €",
    isPromoted: true
  },
  {
    id: 4,
    name: "Huile d'Olive Extra Vierge",
    category: "huile",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Huile d'olive extra vierge pressée à froid, idéale pour la cuisine et les assaisonnements.",
    brand: "Oliveraie Premium",
    price: "8,75 €",
    isPromoted: true
  }
];

export default function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/071e5ffc-6682-4cb8-b028-b4409fc418e3.png"
          title="On pense à vous, on pense à vos économies"
          description="Vos produits préférés à des prix abordables, juste à côté de chez vous"
        />

        {/* Intro Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Bienvenue chez Consom Supermarché</h2>
              <p className="text-lg text-gray-600">
                Consom est votre partenaire du quotidien, proposant une large gamme de produits de qualité 
                pour répondre à tous vos besoins, à des prix compétitifs et dans une ambiance conviviale.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-consom hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-consom/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-consom" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Produits de Qualité</h3>
                <p className="text-gray-600">Une sélection rigoureuse des meilleurs produits pour satisfaire toutes vos envies.</p>
              </div>

              <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-consom hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-consom/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-consom" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Proximité</h3>
                <p className="text-gray-600">Situé au cœur de votre quartier pour un accès facile et rapide à tous vos produits essentiels.</p>
              </div>

              <div className="text-center p-6 rounded-lg border border-gray-200 hover:border-consom hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-consom/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-consom" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Horaires Adaptés</h3>
                <p className="text-gray-600">Des horaires d'ouverture étendus pour vous servir quand vous en avez besoin.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Nos Familles de Produits</h2>
              <Button variant="outline" asChild className="flex items-center">
                <Link to="/products">
                  Voir tout
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 6).map(category => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  image={category.image}
                  productCount={category.productCount}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-consom to-consom-dark p-8 md:p-12">
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                <ShoppingCart className="w-full h-full" />
              </div>
              
              <div className="relative z-10 max-w-2xl text-white">
                <h2 className="text-3xl font-bold mb-4">Promotions de la Semaine</h2>
                <p className="text-white/90 text-lg mb-6">
                  Découvrez notre sélection de produits à prix réduits. Offres valables jusqu'à épuisement des stocks.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-consom" asChild>
                  <Link to="/promotions">Voir les promotions</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Produits en Vedette</h2>
              <Button variant="outline" asChild className="flex items-center">
                <Link to="/promotions">
                  Voir plus
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  image={product.image}
                  description={product.description}
                  brand={product.brand}
                  price={product.price}
                  isPromoted={product.isPromoted}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <img 
                src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
                alt="Consom Supermarché" 
                className="h-12 mb-6 mx-auto"
              />
              <h2 className="text-3xl font-bold mb-4">Chaque client est Roi</h2>
              <p className="text-lg text-gray-600 mb-8">
                Découvrez pourquoi des milliers de clients nous font confiance chaque jour pour leurs achats quotidiens.
                Venez nous rendre visite dans votre supermarché Consom le plus proche.
              </p>
              <Button variant="consom" size="lg" asChild>
                <Link to="/about">Découvrir Notre Histoire</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
