
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AdminNav } from "@/components/admin/AdminNav";
import { ProductsManagement } from "@/components/admin/ProductsManagement";
import { CategoriesManagement } from "@/components/admin/CategoriesManagement";
import { PromotionsManagement } from "@/components/admin/PromotionsManagement";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'products' | 'categories' | 'promotions'>('products');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
      
      <main className="container py-8">
        {activeSection === 'products' && <ProductsManagement />}
        {activeSection === 'categories' && <CategoriesManagement />}
        {activeSection === 'promotions' && <PromotionsManagement />}
      </main>
    </div>
  );
}
