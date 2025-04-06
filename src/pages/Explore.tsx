
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { destinations, Destination } from '@/data/karnataka-destinations';
import { MapPin, Filter, Search, ArrowRight, Star, Map, Globe } from 'lucide-react';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  // Extract all unique categories for filtering
  const allCategories = Array.from(
    new Set(destinations.flatMap(destination => destination.category))
  ).sort();
  
  // Extract all unique regions for filtering
  const allRegions = Array.from(
    new Set(destinations.map(destination => destination.region))
  ).sort();
  
  // Handle category selection/deselection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  // Handle region selection/deselection
  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region) 
        : [...prev, region]
    );
  };
  
  // Filter destinations based on search query, selected categories, and regions
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategories = selectedCategories.length === 0 || 
                             selectedCategories.some(category => 
                               destination.category.includes(category)
                             );
    
    const matchesRegions = selectedRegions.length === 0 ||
                          selectedRegions.includes(destination.region);
    
    return matchesSearch && matchesCategories && matchesRegions;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-travel">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1600100598626-28e4078364bd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFkYW1pJTIwY2F2ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')" 
            }}>
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                Explore All of Karnataka
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Discover destinations across all regions of Karnataka - from coastal beaches to mountain retreats, ancient temples to modern cities.
              </p>
              <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} fill="#FCA311" stroke="#FCA311" className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-white text-sm">Rated 4.9 by over 500 travelers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Search */}
        <section className="py-8 bg-gradient-travel">
          <div className="container mx-auto px-4">
            <div className="rounded-xl bg-white p-6 shadow-xl -mt-20 relative">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Search destinations, places, or activities..."
                      className="pl-10 border-gray-300 rounded-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  {/* Categories Filter */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <Filter className="h-5 w-5 text-muted-foreground mr-1" />
                    <span className="text-sm font-medium mr-2">Activities:</span>
                    {allCategories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className={`text-xs h-8 px-3 rounded-full ${
                          selectedCategories.includes(category) 
                            ? 'bg-karnataka-orange hover:bg-karnataka-terracotta text-white' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Regions Filter */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <Globe className="h-5 w-5 text-muted-foreground mr-1" />
                    <span className="text-sm font-medium mr-2">Regions:</span>
                    {allRegions.map(region => (
                      <Button
                        key={region}
                        variant={selectedRegions.includes(region) ? "default" : "outline"}
                        className={`text-xs h-8 px-3 rounded-full ${
                          selectedRegions.includes(region) 
                            ? 'bg-karnataka-blue hover:bg-karnataka-darkblue text-white' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => toggleRegion(region)}
                      >
                        {region}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Destinations Grid */}
        <section className="py-12 bg-gradient-travel">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
            </h2>
            <p className="text-gray-600 mb-10">Discover Karnataka's rich cultural heritage and breathtaking landscapes across the entire state</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map(destination => (
                <Card key={destination.id} className="destination-card overflow-hidden animate-shimmer">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-bold">{destination.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1 text-karnataka-orange" />
                        <span>{destination.region}</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {destination.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Best Time to Visit:</h4>
                      <p className="text-sm text-muted-foreground">{destination.bestTimeToVisit}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destination.category.map((category, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-xs rounded-full bg-karnataka-cream text-karnataka-blue font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Link to={`/destination/${destination.id}`} className="w-full">
                      <Button variant="outline" className="w-full border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white rounded-full">
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredDestinations.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-2xl font-medium mb-2">No destinations found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria or clearing filters</p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                    setSelectedRegions([]);
                  }}
                  className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white rounded-full"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Explore;
