
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-teal-100 p-4 rounded-full">
            <MapPin className="h-16 w-16 text-teal-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-teal-700">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! This destination isn't on our map</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for seems to have taken a different route.
        </p>
        <Link to="/" className="inline-block bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
