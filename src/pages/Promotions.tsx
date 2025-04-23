
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";

// Sample promotion products data
const promotionProducts = [
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
  },
  {
    id: 5,
    name: "Café Moulu Arabica",
    category: "petit-dejeuner",
    image: "https://images.unsplash.com/photo-1587922546307-776227941871?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Café moulu 100% Arabica, torréfié artisanalement pour un arôme riche et équilibré.",
    brand: "Cafés Sélection",
    price: "4,50 €",
    isPromoted: true
  },
  {
    id: 6,
    name: "Yaourt Nature",
    category: "petit-dejeuner",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Yaourt nature onctueux, fabriqué avec du lait entier de vaches nourries à l'herbe.",
    brand: "Laiterie Locale",
    price: "1,99 €",
    isPromoted: true
  },
  {
    id: 7,
    name: "Pommes Bio",
    category: "fruits-legumes",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Pommes biologiques cultivées localement, croquantes et juteuses, idéales pour une collation saine.",
    brand: "Vergers Bio",
    price: "3,99 €/kg",
    isPromoted: true
  },
  {
    id: 8,
    name: "Gel Douche Lavande",
    category: "cosmetiques-confort-maison",
    image: "https://images.unsplash.com/photo-1602409339188-95d178a611a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Gel douche parfumé à la lavande, enrichi en huiles essentielles pour une peau douce et hydratée.",
    brand: "Nature & Bien-être",
    price: "3,45 €",
    isPromoted: true
  }
];

// Product of the month
const productOfMonth = {
  id: 101,
  name: "Miel de Montagne",
  category: "petit-dejeuner",
  image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  description: "Miel de montagne récolté à la main dans des ruches traditionnelles. Une douceur naturelle pour vos petits déjeuners et vos desserts.",
  brand: "Apiculteur de Tradition",
  price: "7,50 €",
  isPromoted: true
};

export default function Promotions() {
  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/071e5ffc-6682-4cb8-b028-b4409fc418e3.png"
          title="Promotions en Cours"
          description="Découvrez nos offres spéciales et économisez sur vos produits préférés"
          buttonText="Voir tous les produits"
          buttonUrl="/products"
        />

        {/* Product of the Month */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Produit du Mois</h2>
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-full">
                  <img 
                    src={productOfMonth.image} 
                    alt={productOfMonth.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="inline-block px-3 py-1 bg-consom text-white text-xs font-semibold rounded-full mb-4">
                    Exclusivité
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{productOfMonth.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{productOfMonth.brand}</p>
                  <p className="text-gray-700 mb-6">{productOfMonth.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-consom">{productOfMonth.price}</p>
                    <span className="text-sm text-gray-500">Prix normal: 9,90 €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Promotions */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Offres Spéciales</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Profitez de nos promotions limitées dans le temps. Offres valables jusqu'à épuisement des stocks.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {promotionProducts.map(product => (
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

        {/* Promotion Info */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="bg-consom/10 rounded-lg p-8 border border-consom/20">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Comment bénéficier de nos promotions</h2>
                <p className="text-gray-700 mb-6">
                  Nos promotions sont disponibles directement en magasin, sans coupon ni carte de fidélité nécessaire. 
                  Les prix affichés sont déjà réduits pour vous faire profiter immédiatement des économies.
                </p>
                <p className="text-gray-700">
                  Rendez-vous dans votre supermarché Consom le plus proche pour découvrir encore plus d'offres exclusives!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
