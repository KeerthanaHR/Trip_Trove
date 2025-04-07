
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  MapPin,
  Map,
  BookOpen,
  LogIn,
  LogOut,
  User,
  School,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Explore", path: "/explore", icon: <MapPin className="h-4 w-4" /> },
    { name: "Plan Trip", path: "/plan", icon: <Map className="h-4 w-4" /> },
    { name: "Community", path: "/community", icon: <BookOpen className="h-4 w-4" /> },
    { name: "School & College Trips", path: "/school-college-trips", icon: <School className="h-4 w-4" /> },
  ];

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-amber-600 text-white py-1 px-2 rounded font-bold">
            TRIP
          </span>
          <span className="font-bold text-lg text-gray-800">Trove</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive(link.path) ? "default" : "ghost"}
                className={`${
                  isActive(link.path)
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="border-amber-600 text-amber-600">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-6 py-6">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="bg-amber-600 text-white py-1 px-2 rounded font-bold">
                  TRIP
                </span>
                <span className="font-bold text-lg text-gray-800">Trove</span>
              </Link>

              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(link.path) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(link.path)
                          ? "bg-amber-600 hover:bg-amber-700 text-white"
                          : "text-gray-700 hover:text-amber-600"
                      }`}
                    >
                      {link.icon}
                      <span className="ml-2">{link.name}</span>
                    </Button>
                  </Link>
                ))}
              </nav>

              <div className="pt-4 border-t flex flex-col space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start border-amber-600 text-amber-600"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start text-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      className="w-full justify-start bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
