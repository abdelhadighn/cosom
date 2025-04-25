
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
              src="/lovable-uploads/076e2cdb-9f87-4c2d-858c-01132912bd96.png" 
              alt="Consom Supermarché" 
              className="h-12 md:h-14"
            />
            <div className="hidden md:flex space-x-2">
              <Button
                variant={activeSection === 'products' ? 'consom' : 'consomOutline'}
                onClick={() => setActiveSection('products')}
              >
                Produits
              </Button>
              <Button
                variant={activeSection === 'categories' ? 'consom' : 'consomOutline'}
                onClick={() => setActiveSection('categories')}
              >
                Catégories
              </Button>
              <Button
                variant={activeSection === 'promotions' ? 'consom' : 'consomOutline'}
                onClick={() => setActiveSection('promotions')}
              >
                Promotions
              </Button>
              <Button
                variant={activeSection === 'messages' ? 'consom' : 'consomOutline'}
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
