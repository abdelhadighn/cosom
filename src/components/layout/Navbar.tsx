
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/076e2cdb-9f87-4c2d-858c-01132912bd96.png" 
            alt="Consom Supermarché" 
            className="h-12 md:h-14"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <Link 
            to="/" 
            className={`text-base font-medium transition-colors ${isActive('/') ? 'text-consom' : 'text-foreground hover:text-consom'}`}
          >
            Accueil
          </Link>
          <Link 
            to="/about" 
            className={`text-base font-medium transition-colors ${isActive('/about') ? 'text-consom' : 'text-foreground hover:text-consom'}`}
          >
            À propos
          </Link>
          <Link 
            to="/products" 
            className={`text-base font-medium transition-colors ${isActive('/products') ? 'text-consom' : 'text-foreground hover:text-consom'}`}
          >
            Produits
          </Link>
          <Link 
            to="/promotions" 
            className={`text-base font-medium transition-colors ${isActive('/promotions') ? 'text-consom' : 'text-foreground hover:text-consom'}`}
          >
            Promotions
          </Link>
        </nav>
        
        {/* Empty div for balance */}
        <div className="hidden md:block w-[120px]" /> {/* Width matches logo */}
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden ml-auto" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Menu</span>
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md pb-4 md:hidden z-50">
          <nav className="flex flex-col space-y-4 p-4">
            <Link 
              to="/" 
              className={`text-base font-medium px-4 py-2 rounded-md ${isActive('/') ? 'bg-consom/10 text-consom' : 'hover:bg-secondary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/about" 
              className={`text-base font-medium px-4 py-2 rounded-md ${isActive('/about') ? 'bg-consom/10 text-consom' : 'hover:bg-secondary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/products" 
              className={`text-base font-medium px-4 py-2 rounded-md ${isActive('/products') ? 'bg-consom/10 text-consom' : 'hover:bg-secondary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </Link>
            <Link 
              to="/promotions" 
              className={`text-base font-medium px-4 py-2 rounded-md ${isActive('/promotions') ? 'bg-consom/10 text-consom' : 'hover:bg-secondary'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Promotions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
