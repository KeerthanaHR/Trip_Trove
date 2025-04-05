
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getDestinationById, getNearbyDestinations } from '@/data/karnataka-destinations';
import { ArrowLeft, MapPin, Calendar, Award, ArrowRight } from 'lucide-react';

const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const destination = getDestinationById(id || '');
  const nearbyDestinations = getNearbyDestinations(id || '');
  
  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
            <Link to="/explore">
              <Button>Return to Explore</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-travel">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center animate-slide-bg" 
            style={{ backgroundImage: `url(${destination.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-end pb-16">
            <Link to="/explore" className="text-white flex items-center mb-8 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
            </Link>
            <div className="max-w-3xl text-white">
              <div className="flex items-center space-x-2 mb-4 animate-fade-in">
                <span className="px-3 py-1 bg-karnataka-orange/90 text-white text-sm rounded-full">
                  {destination.category[0]}
                </span>
                <div className="flex items-center text-white/80 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Karnataka, India</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                {destination.name}
              </h1>
              
              <p className="text-xl md:text-2xl mb-6 text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {destination.shortDescription}
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6">About {destination.name}</h2>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  {destination.description}
                </p>
                
                <h3 className="text-2xl font-bold mb-4">Things to See</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {destination.thingsToSee.map((thing, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-karnataka-orange/10 p-2 rounded-full mr-3">
                        <Award className="h-5 w-5 text-karnataka-orange" />
                      </div>
                      <div>
                        <p className="font-medium">{thing}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center mb-8 p-4 bg-karnataka-cream rounded-lg">
                  <Calendar className="h-10 w-10 text-karnataka-orange mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Best Time to Visit</h4>
                    <p className="text-gray-700">{destination.bestTimeToVisit}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Location</h3>
                  <div className="h-96 bg-gray-200 rounded-lg">
                    <iframe 
                      title="Destination Map"
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      className="rounded-lg"
                      src={`https://maps.google.com/maps?q=${destination.location.lat},${destination.location.lng}&z=12&output=embed`} 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                <div className="sticky top-8">
                  <Card className="shadow-xl border-0 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-karnataka-orange to-karnataka-terracotta text-white">
                      <h3 className="text-xl font-bold mb-2">Plan Your Visit</h3>
                      <p className="opacity-90">Discover the best of {destination.name}</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h4 className="font-bold mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.category.map((category, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 text-xs rounded-full bg-karnataka-cream text-karnataka-blue"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-bold mb-2">Trip Planning</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-karnataka-orange mr-2"></div>
                            <span>Recommended stay: 2-3 days</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-karnataka-orange mr-2"></div>
                            <span>Photography opportunities</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-karnataka-orange mr-2"></div>
                            <span>Family-friendly destination</span>
                          </li>
                        </ul>
                      </div>
                      
                      <Link to="/plan">
                        <Button className="w-full bg-karnataka-orange hover:bg-karnataka-terracotta">
                          Plan Your Trip Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Nearby Destinations */}
        {nearbyDestinations.length > 0 && (
          <section className="py-16 bg-gradient-travel">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Nearby Destinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {nearbyDestinations.map((destination) => (
                  <Card key={destination.id} className="destination-card overflow-hidden">
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <p className="text-gray-600 mb-4">{destination.shortDescription.substring(0, 80)}...</p>
                      <Link to={`/destination/${destination.id}`}>
                        <Button variant="outline" className="w-full border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                          View Details <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DestinationDetails;
