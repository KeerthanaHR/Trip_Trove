
import React from 'react';
import { Button } from '@/components/ui/button';
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
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Hero Background with static image */}
      <div className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')"
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-heading">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/explore">
              <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white px-8 py-6 text-lg rounded-full font-medium shadow-lg transition-all hover:scale-105">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
