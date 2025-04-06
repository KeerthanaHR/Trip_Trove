
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { destinations } from '@/data/karnataka-destinations';
import { calculateOptimalRoute, calculateTotalDistance, estimateTotalTravelTime, Place } from '@/utils/routeCalculator';
import { MapPin, Navigation, Clock, RotateCw, Save, Share } from 'lucide-react';
import { destinationsToPlaces, getDistance } from '@/utils/mapHelpers';

// Create a more interactive map component
const InteractiveMap = ({ selectedDestinations, optimalRoute }) => {
  return (
    <div className="w-full h-full bg-gray-100 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-50 rounded-lg">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
          {/* Karnataka State Outline */}
          <path 
            d="M400,200 C450,180 500,150 550,180 C600,210 650,200 700,220 C750,240 780,300 800,350 C820,400 830,450 820,500 C810,550 790,600 750,630 C710,660 650,680 600,700 C550,720 500,730 450,720 C400,710 350,690 320,650 C290,610 270,550 260,500 C250,450 260,400 280,350 C300,300 350,220 400,200 Z" 
            fill="#e6f7f5" 
            stroke="#2dd4bf" 
            strokeWidth="2"
          />
          
          {/* Plot selected destinations */}
          {selectedDestinations.map((dest, index) => {
            // Normalize coordinates to fit our SVG viewBox
            const x = (dest.location.lng + 75) * 200; // Simple transformation from geo coords
            const y = (14 - dest.location.lat) * 200; // Simple transformation from geo coords
            
            return (
              <g key={dest.id}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r={15} 
                  fill={optimalRoute.some(r => r.id === dest.id) ? "#f97316" : "#2dd4bf"} 
                  stroke="#fff" 
                  strokeWidth="2"
                />
                <text 
                  x={x} 
                  y={y - 20} 
                  textAnchor="middle" 
                  fill="#1e293b" 
                  fontSize="14" 
                  fontWeight="500"
                >
                  {dest.name}
                </text>
              </g>
            );
          })}
          
          {/* Draw route lines between points in optimal order */}
          {optimalRoute.length > 1 && (
            <g>
              {optimalRoute.map((dest, index) => {
                if (index === optimalRoute.length - 1) return null;
                
                const nextDest = optimalRoute[index + 1];
                const x1 = (dest.location.lng + 75) * 200;
                const y1 = (14 - dest.location.lat) * 200;
                const x2 = (nextDest.location.lng + 75) * 200;
                const y2 = (14 - nextDest.location.lat) * 200;
                
                return (
                  <line 
                    key={`route-${index}`}
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="#f97316" 
                    strokeWidth="3" 
                    strokeDasharray="5,5"
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md z-10">
        <Button size="sm" variant="outline" className="w-8 h-8 p-0">
          <RotateCw className="h-4 w-4" />
        </Button>
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
      const placesArray = destinationsToPlaces(selectedDestinations);
      const route = calculateOptimalRoute(placesArray);
      
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
    <section className="py-16 bg-teal-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-800">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Destination Selection */}
          <div className="lg:col-span-1">
            <Card className="h-full border-teal-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-teal-800">Select Destinations</CardTitle>
                <CardDescription>
                  Choose the places you want to visit in Karnataka
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-teal-50">
                  {destinations.map(destination => (
                    <div 
                      key={destination.id}
                      className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                        selectedDestinations.some(d => d.id === destination.id) 
                          ? 'bg-teal-600 text-white scale-105 shadow-md' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => handleDestinationSelect(destination)}
                    >
                      <MapPin className="h-5 w-5 shrink-0" />
                      <div>
                        <h4 className="font-medium">{destination.name}</h4>
                        <p className={`text-xs ${selectedDestinations.some(d => d.id === destination.id) ? 'text-white/80' : 'text-gray-500'}`}>
                          {destination.region}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedDestinations.length > 0 && (
                  <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-teal-800">Your Trip Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-teal-600" />
                        <span>{selectedDestinations.length} destinations selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-teal-600" />
                        <span>Total distance: {totalDistance} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-teal-600" />
                        <span>
                          Est. travel time: {estimateTotalTravelTime(destinationsToPlaces(selectedDestinations), 'car')} hours by car
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
            <Card className="h-full border-teal-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-teal-800">Interactive Map</CardTitle>
                <CardDescription>
                  View and select destinations on the map
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <InteractiveMap 
                  selectedDestinations={selectedDestinations} 
                  optimalRoute={optimalRoute} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Route Details Section */}
        {optimalRoute.length > 0 && (
          <Card className="mt-8 border-teal-100 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-teal-50/70">
              <CardTitle className="text-teal-800">Your Optimal Route</CardTitle>
              <CardDescription>
                We've calculated the most efficient route for your selected destinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-4 text-lg text-teal-800">Route Overview</h4>
                  <div className="space-y-3">
                    {optimalRoute.map((destination, index) => (
                      <div key={destination.id} className="flex items-center gap-2">
                        <div className="bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                          {index + 1}
                        </div>
                        <span>{destination.name}</span>
                        {index < optimalRoute.length - 1 && (
                          <div className="text-gray-400 text-xs ml-1">
                            {getDistance(destination.name, optimalRoute[index + 1].name)} km
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4 text-lg text-teal-800">Travel Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Navigation className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="font-medium">Total Distance</p>
                        <p className="text-muted-foreground">{totalDistance} kilometers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="font-medium">Estimated Times</p>
                        <p className="text-muted-foreground">
                          Car: {estimateTotalTravelTime(destinationsToPlaces(optimalRoute), 'car')} hours<br />
                          Bus: {estimateTotalTravelTime(destinationsToPlaces(optimalRoute), 'bus')} hours<br />
                          Train: Where available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4 text-lg text-teal-800">Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                      <Save className="mr-2 h-4 w-4" /> Save This Itinerary
                    </Button>
                    <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
                      View Transportation Options
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <Share className="mr-2 h-4 w-4" /> Share Route
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
