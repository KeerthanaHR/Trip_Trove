
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserCircle, MapPin, Calendar, Users, Menu, X, LogOut } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-karnataka-orange text-white">
                      {getInitials(user.user_metadata?.full_name || user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {user.user_metadata?.full_name || user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/my-trips')}>
                  My Trips
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button className="bg-karnataka-orange text-white hover:bg-karnataka-terracotta">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
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
              {user ? (
                <>
                  <div className="py-2 border-t border-gray-100 mt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-karnataka-orange text-white">
                          {getInitials(user.user_metadata?.full_name || user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {user.user_metadata?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth?tab=signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-karnataka-orange text-white hover:bg-karnataka-terracotta w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
