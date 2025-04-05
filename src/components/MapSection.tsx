
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { destinations } from '@/data/karnataka-destinations';
import { calculateOptimalRoute, calculateTotalDistance, estimateTotalTravelTime } from '@/utils/routeCalculator';
import { MapPin, Navigation, Clock, PlaneTakeoff } from 'lucide-react';

// We're mocking a map since we're not installing real map libraries in this code block
const MockMap = () => {
  return (
    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center p-8">
        <MapPin className="h-10 w-10 text-karnataka-orange mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Interactive Map Component</p>
        <p className="text-sm text-gray-500">
          This would be replaced with a real map using libraries like Leaflet or Google Maps
        </p>
      </div>
    </div>
  );
};

interface MapSectionProps {
  title?: string;
  description?: string;
}

const MapSection: React.FC<MapSectionProps> = ({
  title = "Plan Your Karnataka Journey",
  description = "Select destinations on the interactive map to create your perfect itinerary with optimal routes and travel times."
}) => {
  const [selectedDestinations, setSelectedDestinations] = useState<typeof destinations>([]);
  const [optimalRoute, setOptimalRoute] = useState<typeof destinations>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  
  // Mock selection of destinations for the demo
  const handleDestinationSelect = (destination: (typeof destinations)[0]) => {
    setSelectedDestinations(prev => {
      // Check if already selected
      if (prev.some(d => d.id === destination.id)) {
        return prev.filter(d => d.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };
  
  // Calculate optimal route when destinations change
  useEffect(() => {
    if (selectedDestinations.length > 0) {
      const route = calculateOptimalRoute(selectedDestinations.map(d => ({
        id: d.id,
        name: d.name,
        lat: d.location.lat,
        lng: d.location.lng,
      })));
      
      // Map back to full destination objects
      const fullRouteDetails = route.map(r => 
        destinations.find(d => d.id === r.id)
      ).filter(Boolean) as typeof destinations;
      
      setOptimalRoute(fullRouteDetails);
      
      const distance = calculateTotalDistance(route);
      setTotalDistance(distance);
    } else {
      setOptimalRoute([]);
      setTotalDistance(0);
    }
  }, [selectedDestinations]);
  
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Destination Selection */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Select Destinations</CardTitle>
                <CardDescription>
                  Choose the places you want to visit in Karnataka
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {destinations.map(destination => (
                    <div 
                      key={destination.id}
                      className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                        selectedDestinations.some(d => d.id === destination.id) 
                          ? 'bg-karnataka-orange text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => handleDestinationSelect(destination)}
                    >
                      <MapPin className="h-5 w-5 shrink-0" />
                      <div>
                        <h4 className="font-medium">{destination.name}</h4>
                        <p className={`text-xs ${selectedDestinations.some(d => d.id === destination.id) ? 'text-white/80' : 'text-gray-500'}`}>
                          {destination.category[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDestinations.length > 0 && (
                  <div className="mt-6 p-4 bg-karnataka-cream rounded-lg">
                    <h4 className="font-medium mb-2">Your Trip Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-karnataka-orange" />
                        <span>{selectedDestinations.length} destinations selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-karnataka-orange" />
                        <span>Total distance: {totalDistance} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-karnataka-orange" />
                        <span>
                          Est. travel time: {estimateTotalTravelTime(selectedDestinations, 'car')} hours by car
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Panel - Map */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>
                  View and select destinations on the map
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <MockMap />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Route Details Section */}
        {optimalRoute.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Optimal Route</CardTitle>
              <CardDescription>
                We've calculated the most efficient route for your selected destinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-4 text-lg">Route Overview</h4>
                  <div className="space-y-3">
                    {optimalRoute.map((destination, index) => (
                      <div key={destination.id} className="flex items-center gap-2">
                        <div className="bg-karnataka-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                          {index + 1}
                        </div>
                        <span>{destination.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4 text-lg">Travel Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Navigation className="h-5 w-5 text-karnataka-orange" />
                      <div>
                        <p className="font-medium">Total Distance</p>
                        <p className="text-muted-foreground">{totalDistance} kilometers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-karnataka-orange" />
                      <div>
                        <p className="font-medium">Estimated Times</p>
                        <p className="text-muted-foreground">
                          Car: {estimateTotalTravelTime(optimalRoute, 'car')} hours<br />
                          Bus: {estimateTotalTravelTime(optimalRoute, 'bus')} hours<br />
                          Train: Where available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4 text-lg">Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-karnataka-orange hover:bg-karnataka-terracotta">
                      Save This Itinerary
                    </Button>
                    <Button variant="outline" className="w-full border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                      View Transportation Options
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Share Route
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default MapSection;
