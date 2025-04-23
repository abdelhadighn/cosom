
import { Button } from "@/components/ui/button";

interface AdminNavProps {
  activeSection: 'products' | 'categories' | 'promotions';
  setActiveSection: (section: 'products' | 'categories' | 'promotions') => void;
  onLogout: () => void;
}

export function AdminNav({ activeSection, setActiveSection, onLogout }: AdminNavProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/b4315c86-97b2-4be4-8311-485eb9d9c1da.png" 
              alt="Consom Supermarché" 
              className="h-8"
            />
            <div className="flex space-x-2">
              <Button
                variant={activeSection === 'products' ? 'consom' : 'outline'}
                onClick={() => setActiveSection('products')}
              >
                Produits
              </Button>
              <Button
                variant={activeSection === 'categories' ? 'consom' : 'outline'}
                onClick={() => setActiveSection('categories')}
              >
                Catégories
              </Button>
              <Button
                variant={activeSection === 'promotions' ? 'consom' : 'outline'}
                onClick={() => setActiveSection('promotions')}
              >
                Promotions
              </Button>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Se déconnecter
          </Button>
        </div>
      </div>
    </nav>
  );
}
