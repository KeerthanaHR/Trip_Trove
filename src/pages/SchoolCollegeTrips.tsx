
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { allDestinations } from '@/data/karnataka-destinations';
import { optimizeRoute, Place } from '@/utils/routeCalculator';
import { destinationsToPlaces } from '@/utils/mapHelpers';
import { Bus, Car, Calendar, Clock, MapPin, School, Users, CreditCard } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SchoolCollegeTrips = () => {
  // Initialize state variables
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<Place[]>([]);
  const [startLocation, setStartLocation] = useState<string>('Bangalore');
  const [duration, setDuration] = useState<number>(3);
  const [budget, setBudget] = useState<number>(1000);
  const [transportation, setTransportation] = useState<string>('bus');
  const [studentCount, setStudentCount] = useState<number>(30);
  const [tripType, setTripType] = useState<string>('educational');
  const [mapInitialized, setMapInitialized] = useState(false);
  
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // Get all available places for selection
  const availablePlaces = destinationsToPlaces(allDestinations);
  
  // Function to handle destination selection
  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id) 
        : [...prev, id]
    );
  };
  
  // Function to calculate optimized route
  const calculateRoute = () => {
    const selectedPlaces = availablePlaces.filter(place => 
      selectedDestinations.includes(place.id)
    );
    
    // Add starting location
    const startingPlace: Place = {
      id: 'start',
      name: startLocation,
      lat: 12.9716,  // Default Bangalore coordinates
      lng: 77.5946
    };
    
    const places = [startingPlace, ...selectedPlaces];
    const result = optimizeRoute(places);
    setOptimizedRoute(result);
  };
  
  // Initialize map when component mounts
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY || '';
      
      mapboxgl.accessToken = MAPBOX_API_KEY;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [76.5, 14.5], // Center of Karnataka
        zoom: 6
      });
      
      map.current.addControl(new mapboxgl.NavigationControl());
      
      map.current.on('load', () => {
        setMapInitialized(true);
      });
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);
  
  // Update map when optimized route changes
  useEffect(() => {
    if (mapInitialized && map.current && optimizedRoute.length > 0) {
      // Clear existing markers and route
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());
      
      // Add markers for each location
      optimizedRoute.forEach((place, index) => {
        // Create marker element
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = index === 0 ? '#4338ca' : '#f97316';
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';
        el.style.color = 'white';
        el.style.fontWeight = 'bold';
        el.style.fontSize = '14px';
        el.innerText = (index + 1).toString();
        
        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat([place.lng, place.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${place.name}</h3>`)
          )
          .addTo(map.current!);
      });
      
      // Create route coordinates
      const coordinates = optimizedRoute.map(place => [place.lng, place.lat]);
      
      // Check if route layer exists and remove it
      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }
      
      // Add route to map
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates
          }
        }
      });
      
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#f97316',
          'line-width': 4
        }
      });
      
      // Fit bounds to show all markers
      const bounds = new mapboxgl.LngLatBounds();
      coordinates.forEach(coord => bounds.extend(coord as [number, number]));
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });
    }
  }, [optimizedRoute, mapInitialized]);
  
  // Calculate estimated costs
  const calculateCosts = () => {
    const transportationCost = transportation === 'bus' 
      ? 300 * studentCount
      : transportation === 'train'
        ? 200 * studentCount
        : 500 * studentCount;
    
    const accommodationCost = 600 * studentCount * duration;
    const foodCost = 200 * studentCount * duration;
    const activityCost = 150 * studentCount;
    
    const totalCost = transportationCost + accommodationCost + foodCost + activityCost;
    const perStudentCost = Math.round(totalCost / studentCount);
    
    return {
      transportation: transportationCost,
      accommodation: accommodationCost,
      food: foodCost,
      activities: activityCost,
      total: totalCost,
      perStudent: perStudentCost
    };
  };
  
  const costs = calculateCosts();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-travel">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                School & College Trip Planner
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-100">
                Plan the perfect educational journey with optimized routes, budget estimates, and interactive itineraries
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <School className="w-5 h-5 text-karnataka-orange" />
                  <span>Educational Tours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bus className="w-5 h-5 text-karnataka-orange" />
                  <span>Transportation Options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-karnataka-orange" />
                  <span>Budget Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <section className="py-12 bg-gradient-travel">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="planTrip" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="planTrip">Plan Your Trip</TabsTrigger>
                <TabsTrigger value="itinerary">View Itinerary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="planTrip" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Trip Parameters */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Trip Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="startLocation">Starting Point</Label>
                        <Input 
                          id="startLocation" 
                          value={startLocation} 
                          onChange={(e) => setStartLocation(e.target.value)} 
                          placeholder="Enter starting location"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tripType">Trip Type</Label>
                        <Select value={tripType} onValueChange={setTripType}>
                          <SelectTrigger id="tripType">
                            <SelectValue placeholder="Select trip type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="educational">Educational Tour</SelectItem>
                            <SelectItem value="cultural">Cultural Trip</SelectItem>
                            <SelectItem value="recreational">Recreational Visit</SelectItem>
                            <SelectItem value="industrial">Industrial Visit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="transportation">Transportation Mode</Label>
                        <Select value={transportation} onValueChange={setTransportation}>
                          <SelectTrigger id="transportation">
                            <SelectValue placeholder="Select transportation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="train">Train</SelectItem>
                            <SelectItem value="car">Private Vehicles</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="students">Number of Students</Label>
                          <span className="text-sm text-gray-500">{studentCount}</span>
                        </div>
                        <Slider 
                          id="students"
                          min={10} 
                          max={100} 
                          step={5} 
                          value={[studentCount]} 
                          onValueChange={(values) => setStudentCount(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="duration">Trip Duration (Days)</Label>
                          <span className="text-sm text-gray-500">{duration}</span>
                        </div>
                        <Slider 
                          id="duration"
                          min={1} 
                          max={10} 
                          step={1} 
                          value={[duration]} 
                          onValueChange={(values) => setDuration(values[0])}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="budget">Budget per Student (₹)</Label>
                          <span className="text-sm text-gray-500">₹{budget}</span>
                        </div>
                        <Slider 
                          id="budget"
                          min={500} 
                          max={5000} 
                          step={100} 
                          value={[budget]} 
                          onValueChange={(values) => setBudget(values[0])}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Destination Selection */}
                  <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Select Destinations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {allDestinations.map(destination => (
                          <div 
                            key={destination.id}
                            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 h-32 group ${
                              selectedDestinations.includes(destination.id) 
                                ? 'ring-2 ring-karnataka-orange ring-offset-2' 
                                : 'hover:shadow-md'
                            }`}
                            onClick={() => toggleDestination(destination.id)}
                          >
                            <img 
                              src={destination.image} 
                              alt={destination.name} 
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-3">
                              <h3 className="text-white font-medium">{destination.name}</h3>
                              <div className="flex items-center text-xs text-white/80">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{destination.region}</span>
                              </div>
                            </div>
                            {selectedDestinations.includes(destination.id) && (
                              <div className="absolute top-2 right-2 bg-karnataka-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                {selectedDestinations.indexOf(destination.id) + 1}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={calculateRoute} 
                          disabled={selectedDestinations.length === 0}
                          className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white"
                        >
                          Optimize Route
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Map View */}
                  <Card className="col-span-1 lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Trip Route Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg overflow-hidden h-[400px]" ref={mapContainer}></div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Itinerary Details */}
                  <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Trip Itinerary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {optimizedRoute.length > 0 ? (
                        <div className="space-y-6">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="bg-karnataka-cream px-3 py-1 rounded-full flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-1 text-karnataka-orange" />
                              <span>{duration} Days</span>
                            </div>
                            <div className="bg-karnataka-cream px-3 py-1 rounded-full flex items-center text-sm">
                              <Users className="w-4 h-4 mr-1 text-karnataka-orange" />
                              <span>{studentCount} Students</span>
                            </div>
                            <div className="bg-karnataka-cream px-3 py-1 rounded-full flex items-center text-sm">
                              {transportation === 'bus' ? (
                                <Bus className="w-4 h-4 mr-1 text-karnataka-orange" />
                              ) : transportation === 'train' ? (
                                <Clock className="w-4 h-4 mr-1 text-karnataka-orange" />
                              ) : (
                                <Car className="w-4 h-4 mr-1 text-karnataka-orange" />
                              )}
                              <span>{transportation === 'bus' ? 'Bus' : transportation === 'train' ? 'Train' : 'Private Vehicles'}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            {optimizedRoute.map((place, index) => (
                              <div key={place.id} className="flex items-start">
                                <div className="flex flex-col items-center mr-4">
                                  <div className="w-8 h-8 rounded-full bg-karnataka-orange text-white flex items-center justify-center font-bold">
                                    {index + 1}
                                  </div>
                                  {index < optimizedRoute.length - 1 && (
                                    <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                                  )}
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm flex-grow">
                                  <h3 className="font-bold text-lg">{place.name}</h3>
                                  {index === 0 ? (
                                    <p className="text-gray-600">Starting Point</p>
                                  ) : index === optimizedRoute.length - 1 ? (
                                    <p className="text-gray-600">Final Destination</p>
                                  ) : (
                                    <p className="text-gray-600">
                                      Day {Math.min(index, duration)} - {index === 1 ? 'First Stop' : `Destination ${index}`}
                                    </p>
                                  )}
                                  
                                  {index > 0 && allDestinations.find(d => d.id === place.id)?.thingsToSee && (
                                    <div className="mt-2">
                                      <p className="text-sm font-medium text-gray-700">Things to See:</p>
                                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                                        {allDestinations.find(d => d.id === place.id)?.thingsToSee?.slice(0, 3).map((item, i) => (
                                          <li key={i} className="flex items-start">
                                            <span className="inline-block w-1 h-1 rounded-full bg-karnataka-orange mt-1.5 mr-2"></span>
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-gray-500">No itinerary generated yet. Please select destinations and optimize route first.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Cost Breakdown */}
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Transportation</span>
                            <span className="font-medium">₹{costs.transportation.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-karnataka-orange h-1.5 rounded-full" 
                              style={{ width: `${(costs.transportation / costs.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Accommodation</span>
                            <span className="font-medium">₹{costs.accommodation.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-karnataka-orange h-1.5 rounded-full" 
                              style={{ width: `${(costs.accommodation / costs.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Food</span>
                            <span className="font-medium">₹{costs.food.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-karnataka-orange h-1.5 rounded-full" 
                              style={{ width: `${(costs.food / costs.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Activities</span>
                            <span className="font-medium">₹{costs.activities.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-karnataka-orange h-1.5 rounded-full" 
                              style={{ width: `${(costs.activities / costs.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center font-medium text-lg mb-2">
                            <span>Total Cost</span>
                            <span className="text-karnataka-blue">₹{costs.total.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm bg-karnataka-cream p-3 rounded-lg">
                            <span>Cost per Student</span>
                            <span className="font-bold text-karnataka-orange">₹{costs.perStudent.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolCollegeTrips;
