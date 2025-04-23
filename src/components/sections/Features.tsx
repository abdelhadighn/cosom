
import { ShoppingCart, Clock, MapPin } from "lucide-react";

export function Features() {
  return (
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
  );
}
