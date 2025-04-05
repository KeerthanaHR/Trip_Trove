
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, ArrowLeft, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-teal-50">
      <div className="text-center bg-white p-8 rounded-xl shadow-xl max-w-lg mx-4">
        <div className="flex justify-center mb-6">
          <div className="bg-karnataka-blue/10 p-6 rounded-full">
            <MapPin className="h-20 w-20 text-karnataka-blue" />
          </div>
        </div>
        <h1 className="text-7xl font-bold mb-4 text-karnataka-blue">404</h1>
        <p className="text-2xl font-heading font-semibold mb-3 text-gray-700">Destination Not Found</p>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you're looking for might have been moved, deleted, or perhaps never existed on our map.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link to="/" className="w-full">
            <Button 
              className="w-full bg-karnataka-blue hover:bg-karnataka-blue/90 text-white font-medium rounded-lg py-6 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Button>
          </Link>
          <Link to="/explore" className="w-full">
            <Button 
              variant="outline"
              className="w-full border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue/10 font-medium rounded-lg py-6 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Explore Destinations
            </Button>
          </Link>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact our support team
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/" className="text-karnataka-blue text-sm hover:underline">Home</Link>
            <Link to="/explore" className="text-karnataka-blue text-sm hover:underline">Explore</Link>
            <Link to="/plan" className="text-karnataka-blue text-sm hover:underline">Plan Trip</Link>
            <Link to="/community" className="text-karnataka-blue text-sm hover:underline">Community</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
