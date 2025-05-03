
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Auth error:", error.message);
        toast({
          title: "Erreur de connexion",
          description: "Identifiants invalides. Veuillez réessayer.",
          variant: "destructive"
        });
        throw error;
      }

      if (data.user) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace administrateur"
        });
        navigate("/gestion/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Identifiants invalides. Veuillez réessayer.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-[calc(100vh-300px)] py-16 flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
                alt="Consom Supermarché" 
                className="h-10"
              />
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-6">Espace Administrateur</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Entrez votre email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="consom" 
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-consom hover:underline block mt-2">
                Retour à la page d'accueil
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
