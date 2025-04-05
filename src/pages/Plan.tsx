
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { destinations, Destination } from '@/data/karnataka-destinations';
import { getTransportOptions, TransportOption } from '@/data/transportation-data';
import { calculateOptimalRoute, calculateTotalDistance, estimateTotalTravelTime } from '@/utils/routeCalculator';
import { MapPin, Navigation, ArrowRight, ArrowLeft, Clock, Calendar, Train, Bus, Car } from 'lucide-react';

const Plan = () => {
  const [step, setStep] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);
  const [startLocation, setStartLocation] = useState<string>('Bangalore');
  const [optimizedRoute, setOptimizedRoute] = useState<Destination[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [transportOptions, setTransportOptions] = useState<{
    train: TransportOption[];
    bus: TransportOption[];
  }>({
    train: [],
    bus: []
  });
  
  // Handle destination selection/deselection
  const toggleDestination = (destination: Destination) => {
    setSelectedDestinations(prev => {
      if (prev.find(d => d.id === destination.id)) {
        return prev.filter(d => d.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };
  
  // Calculate optimal route when destinations change
  useEffect(() => {
    if (selectedDestinations.length > 0) {
      // Create a full route starting with the start location if it's not a destination
      const fullRoute = [
        {
          id: 'start',
          name: startLocation,
          lat: 12.9716, // Bangalore coordinates as default
          lng: 77.5946
        },
        ...selectedDestinations.map(d => ({
          id: d.id,
          name: d.name,
          lat: d.location.lat,
          lng: d.location.lng,
        }))
      ];
      
      const optimizedRoutePoints = calculateOptimalRoute(fullRoute);
      
      // Convert route points back to full destination objects
      const routeWithDetails = optimizedRoutePoints.map(point => {
        if (point.id === 'start') {
          return {
            id: 'start',
            name: startLocation,
            description: `Starting point of your journey`,
            shortDescription: `Your journey begins here`,
            image: '', // placeholder image could be added
            location: {
              lat: point.lat,
              lng: point.lng
            },
            category: ['Starting Point'],
            bestTimeToVisit: 'Any time',
            thingsToSee: [],
            nearbyDestinations: []
          };
        } else {
          return destinations.find(d => d.id === point.id);
        }
      }).filter(Boolean) as Destination[];
      
      setOptimizedRoute(routeWithDetails);
      setTotalDistance(calculateTotalDistance(optimizedRoutePoints));
    } else {
      setOptimizedRoute([]);
      setTotalDistance(0);
    }
  }, [selectedDestinations, startLocation]);
  
  // Fetch transport options when route is optimized
  useEffect(() => {
    if (optimizedRoute.length >= 2) {
      const trainOptions: TransportOption[] = [];
      const busOptions: TransportOption[] = [];
      
      // Fetch options for each leg of the journey
      for (let i = 0; i < optimizedRoute.length - 1; i++) {
        const from = optimizedRoute[i].name;
        const to = optimizedRoute[i + 1].name;
        
        const trainOpts = getTransportOptions(from, to, 'train');
        const busOpts = getTransportOptions(from, to, 'bus');
        
        trainOptions.push(...trainOpts);
        busOptions.push(...busOpts);
      }
      
      setTransportOptions({
        train: trainOptions,
        bus: busOptions
      });
    }
  }, [optimizedRoute]);
  
  // Go to next step
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  // Go to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-secondary">
        {/* Hero Banner */}
        <div className="relative h-[25vh] min-h-[200px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1580891587477-3ab84d823a39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vcmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')" 
            }}>
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Plan Your Karnataka Adventure
              </h1>
              <p className="text-md md:text-lg text-gray-100">
                Create your custom itinerary with optimized routes and transportation options
              </p>
            </div>
          </div>
        </div>
        
        {/* Trip Planning Steps */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Create Your Trip Plan</h2>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-4">Step {step} of 3</span>
                  <div className="flex gap-2">
                    {step > 1 && (
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={prevStep}
                      >
                        <ArrowLeft className="h-4 w-4" /> Back
                      </Button>
                    )}
                    {step < 3 && selectedDestinations.length > 0 && (
                      <Button 
                        className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white flex items-center gap-1"
                        onClick={nextStep}
                      >
                        Next <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
                <div 
                  className="h-full bg-karnataka-orange rounded-full transition-all"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
              
              {/* Step 1: Choose Destinations */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select Your Destinations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {destinations.map(destination => (
                      <div 
                        key={destination.id}
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                          selectedDestinations.find(d => d.id === destination.id)
                            ? 'border-karnataka-orange ring-2 ring-karnataka-orange/20'
                            : 'border-gray-200 hover:border-karnataka-orange/50'
                        }`}
                        onClick={() => toggleDestination(destination)}
                      >
                        <div className="h-32 overflow-hidden">
                          <img 
                            src={destination.image} 
                            alt={destination.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">{destination.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {destination.category.slice(0, 2).join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedDestinations.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Your Selected Destinations</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDestinations.map(destination => (
                          <div 
                            key={destination.id}
                            className="bg-white px-3 py-1 rounded-full border border-gray-200 flex items-center gap-1 text-sm"
                          >
                            <MapPin className="h-3 w-3 text-karnataka-orange" />
                            {destination.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 2: Review Route */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Optimal Route & Trip Details</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Route Overview */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Your Journey</CardTitle>
                        <CardDescription>
                          We've calculated the optimal route for your trip
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {optimizedRoute.map((destination, index) => (
                            <div key={destination.id} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="bg-karnataka-orange text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">
                                  {index + 1}
                                </div>
                                {index < optimizedRoute.length - 1 && (
                                  <div className="w-0.5 h-12 bg-gray-300 mt-1"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">{destination.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {destination.id === 'start' 
                                    ? 'Starting Point' 
                                    : destination.category[0]}
                                </p>
                                {index < optimizedRoute.length - 1 && (
                                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <Navigation className="h-3 w-3" />
                                    <span>
                                      {getDistance(
                                        destination.name, 
                                        optimizedRoute[index + 1].name
                                      )} km to next stop
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Trip Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Trip Overview</CardTitle>
                        <CardDescription>
                          Key details about your planned journey
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-karnataka-orange" />
                            <div>
                              <p className="font-medium">Destinations</p>
                              <p className="text-muted-foreground">
                                {selectedDestinations.length} places to visit
                              </p>
                            </div>
                          </div>
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
                              <p className="font-medium">Estimated Travel Times</p>
                              <p className="text-muted-foreground">
                                <span className="flex items-center gap-1 mt-1">
                                  <Car className="h-4 w-4" /> {estimateTotalTravelTime(optimizedRoute, 'car')} hours by car
                                </span>
                                <span className="flex items-center gap-1 mt-1">
                                  <Bus className="h-4 w-4" /> {estimateTotalTravelTime(optimizedRoute, 'bus')} hours by bus
                                </span>
                                <span className="flex items-center gap-1 mt-1">
                                  <Train className="h-4 w-4" /> Travel times vary by route
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-karnataka-orange" />
                            <div>
                              <p className="font-medium">Recommended Duration</p>
                              <p className="text-muted-foreground">
                                {Math.max(Math.ceil(selectedDestinations.length / 2), 3)} days
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recommendations</CardTitle>
                        <CardDescription>
                          Tips to enhance your Karnataka journey
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Best Time to Visit</h4>
                            <p className="text-sm text-muted-foreground">
                              October to February offers the most pleasant weather for exploring Karnataka.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Local Transportation</h4>
                            <p className="text-sm text-muted-foreground">
                              KSRTC buses connect most destinations. Consider hiring a car for more flexibility.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">School/College Groups</h4>
                            <p className="text-sm text-muted-foreground">
                              Special group rates available for educational institutions. Contact us for details.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full bg-karnataka-orange hover:bg-karnataka-terracotta text-white"
                          onClick={nextStep}
                        >
                          Continue to Transportation Options
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              )}
              
              {/* Step 3: Transport Options */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Transportation Options</h3>
                  
                  <Tabs defaultValue="train">
                    <TabsList className="mb-6">
                      <TabsTrigger value="train" className="flex items-center gap-2">
                        <Train className="h-4 w-4" /> Train
                      </TabsTrigger>
                      <TabsTrigger value="bus" className="flex items-center gap-2">
                        <Bus className="h-4 w-4" /> Bus
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="train">
                      <div className="space-y-6">
                        {transportOptions.train.length > 0 ? (
                          transportOptions.train.map((option, index) => (
                            <Card key={index}>
                              <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div>
                                    <h4 className="font-medium">{option.name}</h4>
                                    <div className="flex items-center gap-6 mt-2">
                                      <div>
                                        <p className="font-semibold text-lg">{option.departureTime}</p>
                                        <p className="text-xs text-muted-foreground">{option.from}</p>
                                      </div>
                                      <div className="flex-grow flex items-center">
                                        <div className="h-0.5 bg-gray-300 flex-grow"></div>
                                        <div className="mx-2 text-xs text-muted-foreground">{option.duration}</div>
                                        <div className="h-0.5 bg-gray-300 flex-grow"></div>
                                      </div>
                                      <div>
                                        <p className="font-semibold text-lg">{option.arrivalTime}</p>
                                        <p className="text-xs text-muted-foreground">{option.to}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="text-xl font-bold">₹{option.price}</div>
                                    <Button className="mt-2 bg-karnataka-orange hover:bg-karnataka-terracotta text-white">
                                      Select
                                    </Button>
                                  </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {option.amenities.map((amenity, i) => (
                                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <h4 className="font-medium text-lg mb-2">No direct train routes found</h4>
                            <p className="text-muted-foreground mb-4">
                              Consider bus options or combining multiple train routes for your journey.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bus">
                      <div className="space-y-6">
                        {transportOptions.bus.length > 0 ? (
                          transportOptions.bus.map((option, index) => (
                            <Card key={index}>
                              <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div>
                                    <h4 className="font-medium">{option.name}</h4>
                                    <div className="flex items-center gap-6 mt-2">
                                      <div>
                                        <p className="font-semibold text-lg">{option.departureTime}</p>
                                        <p className="text-xs text-muted-foreground">{option.from}</p>
                                      </div>
                                      <div className="flex-grow flex items-center">
                                        <div className="h-0.5 bg-gray-300 flex-grow"></div>
                                        <div className="mx-2 text-xs text-muted-foreground">{option.duration}</div>
                                        <div className="h-0.5 bg-gray-300 flex-grow"></div>
                                      </div>
                                      <div>
                                        <p className="font-semibold text-lg">{option.arrivalTime}</p>
                                        <p className="text-xs text-muted-foreground">{option.to}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="text-xl font-bold">₹{option.price}</div>
                                    <Button className="mt-2 bg-karnataka-orange hover:bg-karnataka-terracotta text-white">
                                      Select
                                    </Button>
                                  </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {option.amenities.map((amenity, i) => (
                                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <h4 className="font-medium text-lg mb-2">No direct bus routes found</h4>
                            <p className="text-muted-foreground mb-4">
                              Consider train options or contacting a local travel agent for custom transportation.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-8 p-6 bg-karnataka-cream rounded-lg">
                    <h4 className="font-medium text-lg mb-2">Special Group Booking</h4>
                    <p className="text-muted-foreground mb-4">
                      Planning a trip for your school or college? We offer special group rates and customized transportation solutions.
                    </p>
                    <Button className="bg-karnataka-blue hover:bg-karnataka-blue/90 text-white">
                      Inquire About Group Booking
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Plan;
