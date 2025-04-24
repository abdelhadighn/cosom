
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/AdminNav";
import { ProductsManagement } from "@/components/admin/ProductsManagement";
import { CategoriesManagement } from "@/components/admin/CategoriesManagement";
import { PromotionsManagement } from "@/components/admin/PromotionsManagement";
import { MessagesManagement } from "@/components/admin/MessagesManagement";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'products' | 'categories' | 'promotions' | 'messages'>('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast({
          title: "Accès refusé",
          description: "Veuillez vous connecter pour accéder à cette page",
          variant: "destructive"
        });
        navigate("/admin");
      }
      
      setLoading(false);
    };
    
    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin");
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté"
    });
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-consom mx-auto"></div>
          <p className="mt-4 text-consom">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
      
      <main className="container py-8">
        {activeSection === 'products' && <ProductsManagement />}
        {activeSection === 'categories' && <CategoriesManagement />}
        {activeSection === 'promotions' && <PromotionsManagement />}
        {activeSection === 'messages' && <MessagesManagement />}
      </main>
    </div>
  );
}
