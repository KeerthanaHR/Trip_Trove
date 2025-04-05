
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-karnataka-blue text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-karnataka-orange" />
              <span className="text-xl font-heading font-bold text-white">Trip Trove</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover Karnataka's rich heritage and plan your perfect journey with our community-driven travel platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Explore Karnataka
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/plan" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Plan Your Trip
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destination/hampi" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Hampi
                </Link>
              </li>
              <li>
                <Link to="/destination/mysore" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Mysore Palace
                </Link>
              </li>
              <li>
                <Link to="/destination/coorg" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Coorg
                </Link>
              </li>
              <li>
                <Link to="/destination/badami" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Badami Cave Temples
                </Link>
              </li>
              <li>
                <Link to="/destination/gokarna" className="text-gray-300 hover:text-karnataka-orange transition-colors">
                  Gokarna Beach
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-karnataka-orange shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Karnataka Tourism Department, Bengaluru, Karnataka, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-karnataka-orange shrink-0" />
                <span className="text-gray-300">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-karnataka-orange shrink-0" />
                <span className="text-gray-300">info@triptrove.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Trip Trove - Karnataka Travel Community. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link to="/privacy" className="hover:text-karnataka-orange transition-colors">Privacy Policy</Link>
            {' '} | {' '}
            <Link to="/terms" className="hover:text-karnataka-orange transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
