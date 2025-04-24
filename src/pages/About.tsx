
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/Hero";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactDialog } from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <Hero 
          image="/lovable-uploads/cd64a135-1dcb-4006-9db6-aca17c2e13db.png"
          title="À Propos de Consom"
          description="Votre partenaire du quotidien"
          overlay={true}
        />

        {/* History Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <p className="text-gray-600 mb-4">
                  Fondé en 2005, Consom Supermarché a vu le jour avec une mission claire : offrir des produits de qualité à des prix accessibles, dans un environnement accueillant et convivial.
                </p>
                <p className="text-gray-600 mb-4">
                  Partant d'un petit magasin familial, nous avons grandi pour devenir une référence dans le secteur de la distribution alimentaire, tout en conservant nos valeurs fondatrices : proximité, qualité et service client exceptionnel.
                </p>
                <p className="text-gray-600">
                  Aujourd'hui, avec plusieurs points de vente dans toute la région, nous continuons à nous engager pour satisfaire nos clients et contribuer positivement à notre communauté.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/lovable-uploads/446fff40-8567-4519-81af-c1a4b93829cb.png" 
                  alt="Histoire de Consom Supermarché" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre Mission et Nos Valeurs</h2>
              <p className="text-lg text-gray-600">
                Nous nous efforçons chaque jour de rendre vos courses plus simples, plus agréables et plus économiques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-consom/10 flex items-center justify-center mb-4">
                  <span className="text-consom text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Qualité</h3>
                <p className="text-gray-600">
                  Nous sélectionnons rigoureusement nos produits pour vous garantir fraîcheur et qualité, en privilégiant les producteurs locaux quand c'est possible.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-consom/10 flex items-center justify-center mb-4">
                  <span className="text-consom text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Économie</h3>
                <p className="text-gray-600">
                  Nous nous engageons à vous proposer les meilleurs prix et des promotions régulières pour préserver votre pouvoir d'achat.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-consom/10 flex items-center justify-center mb-4">
                  <span className="text-consom text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold text-xl mb-3">Proximité</h3>
                <p className="text-gray-600">
                  Nous sommes ancrés dans la vie locale et cherchons à être plus qu'un simple supermarché : un véritable lieu de vie et d'échange.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
                <p className="text-gray-600 mb-8">
                  Nous sommes à votre écoute pour toute question ou suggestion. N'hésitez pas à nous contacter.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-consom mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-gray-600">123 Rue du Commerce<br />75000 Paris, France</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-consom mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-gray-600">+33 1 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-consom mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">contact@consom.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-consom mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Horaires d'ouverture</h3>
                      <p className="text-gray-600">
                        Lundi - Samedi: 8h00 - 20h00<br />
                        Dimanche: 9h00 - 18h00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <ContactDialog />
                </div>
              </div>

              <div className="md:col-span-3 rounded-lg overflow-hidden h-[400px]">
                {/* Embed a map here - using a placeholder for now */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.95410942551!2d2.2769953554997236!3d48.858833639324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1632901552755!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Consom Supermarché Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-consom text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Découvrez Nos Produits</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Parcourez notre vaste sélection de produits frais et de qualité pour tous vos besoins quotidiens.
            </p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-consom" size="lg" asChild>
              <Link to="/products">
                Explorer le catalogue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
