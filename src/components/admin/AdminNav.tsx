
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function AdminNav({ 
  activeSection, 
  setActiveSection, 
  onLogout 
}: { 
  activeSection: 'products' | 'categories' | 'promotions' | 'messages',
  setActiveSection: (section: 'products' | 'categories' | 'promotions' | 'messages') => void,
  onLogout: () => void
}) {
  return (
    <nav className="bg-white border-b">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
              alt="Consom Supermarché" 
              className="h-8"
            />
            <div className="hidden md:flex space-x-2">
              <Button
                variant={activeSection === 'products' ? "default" : "ghost"}
                onClick={() => setActiveSection('products')}
              >
                Produits
              </Button>
              <Button
                variant={activeSection === 'categories' ? "default" : "ghost"}
                onClick={() => setActiveSection('categories')}
              >
                Catégories
              </Button>
              <Button
                variant={activeSection === 'promotions' ? "default" : "ghost"}
                onClick={() => setActiveSection('promotions')}
              >
                Promotions
              </Button>
              <Button
                variant={activeSection === 'messages' ? "default" : "ghost"}
                onClick={() => setActiveSection('messages')}
              >
                Messages
                <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Déconnexion
          </Button>
        </div>
      </div>
    </nav>
  );
}
