
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate login - in a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      // This would be server validation in a real app
      if (username === "admin" && password === "password") {
        alert("Connexion réussie! Dans une application réelle, vous seriez redirigé vers le tableau de bord administrateur.");
      } else {
        setError("Identifiants invalides. Veuillez réessayer.");
      }
    }, 1000);
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
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      id="username"
                      type="text"
                      placeholder="Entrez votre nom d'utilisateur"
                      className="pl-10"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
              <p className="text-sm text-gray-600">
                Mot de passe oublié ? Contactez l'administrateur système.
              </p>
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
