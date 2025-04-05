
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
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Hero Background with Carousel Effect */}
      <div className="absolute inset-0 bg-cover bg-center animate-slide-bg" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1621058677758-e80851a127c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>
      
      {/* Floating Images of Places */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto h-full relative">
          {/* Hampi Image */}
          <div className="absolute top-[20%] right-[10%] w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden shadow-2xl transform rotate-3 animate-float-slow opacity-90">
            <img 
              src="https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" 
              alt="Hampi" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
              <p className="text-white text-xs md:text-sm font-medium text-center">Hampi</p>
            </div>
          </div>
          
          {/* Mysore Palace Image */}
          <div className="absolute top-[35%] left-[12%] w-28 h-28 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-2xl transform -rotate-2 animate-float opacity-90">
            <img 
              src="https://images.unsplash.com/photo-1600100598629-200722fda2fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" 
              alt="Mysore Palace" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
              <p className="text-white text-xs md:text-sm font-medium text-center">Mysore Palace</p>
            </div>
          </div>
          
          {/* Coorg Image */}
          <div className="absolute bottom-[20%] right-[15%] w-24 h-24 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-2xl transform rotate-6 animate-float-slow opacity-90">
            <img 
              src="https://images.unsplash.com/photo-1580891587477-3ab84d823a39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vcmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" 
              alt="Coorg" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
              <p className="text-white text-xs md:text-sm font-medium text-center">Coorg</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/explore">
              <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/plan">
              <Button variant="outline" className="border-white border-2 text-white hover:bg-white hover:text-karnataka-orange px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105">
                Plan Your Trip <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Featured On Section */}
          <div className="mt-16 pt-8 border-t border-white/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm uppercase text-gray-300 mb-4">Discover Karnataka's Top Destinations</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">01</span>
                </div>
                <span className="text-white">Hampi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">02</span>
                </div>
                <span className="text-white">Mysore</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">03</span>
                </div>
                <span className="text-white">Coorg</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xs">04</span>
                </div>
                <span className="text-white">Badami</span>
              </div>
            </div>
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
