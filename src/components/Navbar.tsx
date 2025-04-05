
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, MapPin, Calendar, Users, Menu, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-karnataka-orange" />
          <span className="text-xl font-heading font-bold bg-gradient-to-r from-karnataka-orange to-karnataka-terracotta bg-clip-text text-transparent">
            Trip Trove
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-karnataka-orange transition-colors font-medium">
            Home
          </Link>
          <Link to="/explore" className="text-foreground hover:text-karnataka-orange transition-colors font-medium">
            Explore
          </Link>
          <Link to="/community" className="text-foreground hover:text-karnataka-orange transition-colors font-medium">
            Community
          </Link>
          <Link to="/plan" className="text-foreground hover:text-karnataka-orange transition-colors font-medium">
            Plan Trip
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
            Login
          </Button>
          <Button className="bg-karnataka-orange text-white hover:bg-karnataka-terracotta">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md absolute w-full animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-karnataka-orange transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="text-foreground hover:text-karnataka-orange transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/community" 
              className="text-foreground hover:text-karnataka-orange transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              to="/plan" 
              className="text-foreground hover:text-karnataka-orange transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Plan Trip
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white w-full">
                Login
              </Button>
              <Button className="bg-karnataka-orange text-white hover:bg-karnataka-terracotta w-full">
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
