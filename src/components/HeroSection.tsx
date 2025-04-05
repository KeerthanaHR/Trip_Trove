
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Discover Karnataka's Heritage",
  subtitle = "Explore ancient temples, majestic palaces, and pristine beaches with our community-driven travel platform."
}) => {
  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')" 
        }}>
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/explore">
              <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white px-8 py-6 text-lg">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/plan">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-karnataka-orange px-8 py-6 text-lg">
                Plan Your Trip <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
