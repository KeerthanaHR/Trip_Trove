
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { School, GraduationCap, Bus, Calendar, Users, Clock, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations } from '@/data/karnataka-destinations';
import { calculateOptimalRoute, calculateTotalDistance, estimateTotalTravelTime, Place } from '@/utils/routeCalculator';
import { destinationsToPlaces } from '@/utils/mapHelpers';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox token
mapboxgl.accessToken = Deno.env.get('MAPBOX_API_KEY') || '';

const SchoolCollegeTrips = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('school');
  const [selectedDestinations, setSelectedDestinations] = useState<typeof destinations>([]);
  const [numStudents, setNumStudents] = useState(50);
  const [days, setDays] = useState(3);
  const [optimizedRoute, setOptimizedRoute] = useState<Place[]>([]);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    departureDate: '',
    additionalNotes: '',
    transportType: 'bus',
  });

  // Initialize map
  useEffect(() => {
    if (!mapboxgl.accessToken) return;
    
    const mapContainer = document.getElementById('tripMap');
    if (!mapContainer || mapInstance) return;
    
    const map = new mapboxgl.Map({
      container: 'tripMap',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [76.5, 13.5], // Center of Karnataka approximately
      zoom: 6,
    });
    
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.on('load', () => {
      setMapInstance(map);
    });
    
    return () => {
      map.remove();
      setMapInstance(null);
    };
  }, []);
  
  // Update map with optimized route
  useEffect(() => {
    if (!mapInstance || optimizedRoute.length < 2) return;
    
    // Clear previous layers and sources
    if (mapInstance.getLayer('route-line')) {
      mapInstance.removeLayer('route-line');
    }
    if (mapInstance.getSource('route')) {
      mapInstance.removeSource('route');
    }
    
    // Clear previous markers
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());
    
    // Add markers for each destination
    optimizedRoute.forEach((place, index) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = index === 0 ? '#10b981' : '#f97316';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.boxShadow = '0 0 0 2px white';
      el.innerText = (index + 1).toString();
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat([place.lng, place.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${place.name}</h3>`))
        .addTo(mapInstance);
    });
    
    // Create a line between points
    const coordinates = optimizedRoute.map(place => [place.lng, place.lat]);
    
    if (coordinates.length >= 2) {
      mapInstance.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        }
      });
      
      mapInstance.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#f97316',
          'line-width': 4,
          'line-dasharray': [2, 1]
        }
      });
      
      // Fit bounds to include all markers
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord as [number, number]);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      
      mapInstance.fitBounds(bounds, {
        padding: 50
      });
    }
  }, [optimizedRoute, mapInstance]);
  
  const handleDestinationToggle = (destination: (typeof destinations)[0]) => {
    setSelectedDestinations(prev => {
      if (prev.some(d => d.id === destination.id)) {
        return prev.filter(d => d.id !== destination.id);
      } else {
        return [...prev, destination];
      }
    });
  };
  
  const calculateRoute = () => {
    if (selectedDestinations.length < 2) {
      toast({
        title: "Not enough destinations",
        description: "Please select at least two destinations to create a route",
        variant: "destructive"
      });
      return;
    }
    
    const places = destinationsToPlaces(selectedDestinations);
    const route = calculateOptimalRoute(places);
    setOptimizedRoute(route);
    
    toast({
      title: "Route optimized",
      description: `Optimal route calculated for ${route.length} destinations`,
    });
  };
  
  const calculateBudget = () => {
    if (selectedDestinations.length === 0) {
      toast({
        title: "No destinations selected",
        description: "Please select at least one destination",
        variant: "destructive"
      });
      return;
    }
    
    // Simple budget calculation
    const transportCost = formData.transportType === 'bus' ? 4000 : 8000; // Per day
    const accommodationCost = 800; // Per student per night
    const foodCost = 350; // Per student per day
    const entryCost = 200; // Per student per destination
    
    const totalTransport = transportCost * days;
    const totalAccommodation = accommodationCost * numStudents * (days - 1);
    const totalFood = foodCost * numStudents * days;
    const totalEntry = entryCost * numStudents * selectedDestinations.length;
    
    const totalCost = totalTransport + totalAccommodation + totalFood + totalEntry;
    const perStudentCost = Math.round(totalCost / numStudents);
    
    toast({
      title: "Budget Estimate",
      description: `Estimated total: ₹${totalCost}. Per student: ₹${perStudentCost}`,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.institutionName || !formData.contactPerson || !formData.email || !formData.departureDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedDestinations.length === 0) {
      toast({
        title: "No destinations selected",
        description: "Please select at least one destination for your trip",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Trip Request Submitted",
      description: "Our team will contact you shortly with a detailed itinerary proposal.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Banner Section */}
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: selectedTab === 'school' 
                ? "url('https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2Nob29sJTIwdHJpcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')" 
                : "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29sbGVnZSUyMHRyaXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')" 
            }}>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-amber-800/70"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {selectedTab === 'school' ? 'School Trip Planning' : 'College Field Trip Planning'}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-100">
                {selectedTab === 'school' 
                  ? 'Organize educational and memorable trips for your students across Karnataka'
                  : 'Create immersive field experiences for college departments and student groups'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="school" onValueChange={setSelectedTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-lg grid-cols-2">
                <TabsTrigger value="school" className="text-lg py-3">
                  <School className="mr-2 h-5 w-5" /> School Trips
                </TabsTrigger>
                <TabsTrigger value="college" className="text-lg py-3">
                  <GraduationCap className="mr-2 h-5 w-5" /> College Trips
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-1">
                <TabsContent value="school" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>School Trip Request</CardTitle>
                      <CardDescription>
                        Let us plan an educational trip for your school students
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="school-name" className="block text-sm font-medium">
                            School Name
                          </label>
                          <Input
                            id="school-name"
                            value={formData.institutionName}
                            onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                            placeholder="Enter school name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="contact-person" className="block text-sm font-medium">
                            Contact Person
                          </label>
                          <Input
                            id="contact-person"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                            placeholder="Teacher or administrator name"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">
                              Email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="Email address"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium">
                              Phone
                            </label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="Contact number"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="num-students" className="block text-sm font-medium">
                              Number of Students
                            </label>
                            <Input
                              id="num-students"
                              type="number"
                              min={10}
                              max={200}
                              value={numStudents}
                              onChange={(e) => setNumStudents(parseInt(e.target.value))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="days" className="block text-sm font-medium">
                              Number of Days
                            </label>
                            <Input
                              id="days"
                              type="number"
                              min={1}
                              max={10}
                              value={days}
                              onChange={(e) => setDays(parseInt(e.target.value))}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="departure-date" className="block text-sm font-medium">
                            Preferred Departure Date
                          </label>
                          <Input
                            id="departure-date"
                            type="date"
                            value={formData.departureDate}
                            onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="transport" className="block text-sm font-medium">
                            Preferred Transport
                          </label>
                          <Select 
                            value={formData.transportType}
                            onValueChange={(value) => setFormData({...formData, transportType: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select transport type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bus">School Bus</SelectItem>
                              <SelectItem value="ac-bus">AC Bus</SelectItem>
                              <SelectItem value="train">Train</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="notes" className="block text-sm font-medium">
                            Additional Notes
                          </label>
                          <Textarea
                            id="notes"
                            placeholder="Any specific requirements, curriculum focuses, or special needs"
                            value={formData.additionalNotes}
                            onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                            rows={4}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                            Submit Trip Request
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="college" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>College Field Trip Request</CardTitle>
                      <CardDescription>
                        Plan a specialized academic or recreational trip for your college
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="college-name" className="block text-sm font-medium">
                            College/University Name
                          </label>
                          <Input
                            id="college-name"
                            value={formData.institutionName}
                            onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                            placeholder="Enter institution name"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="department" className="block text-sm font-medium">
                            Department/Faculty
                          </label>
                          <Input
                            id="department"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                            placeholder="Department organizing the trip"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium">
                              Email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="Email address"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium">
                              Phone
                            </label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="Contact number"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="num-students" className="block text-sm font-medium">
                              Number of Participants
                            </label>
                            <Input
                              id="num-students"
                              type="number"
                              min={10}
                              max={200}
                              value={numStudents}
                              onChange={(e) => setNumStudents(parseInt(e.target.value))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="days" className="block text-sm font-medium">
                              Number of Days
                            </label>
                            <Input
                              id="days"
                              type="number"
                              min={1}
                              max={10}
                              value={days}
                              onChange={(e) => setDays(parseInt(e.target.value))}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="departure-date" className="block text-sm font-medium">
                            Preferred Departure Date
                          </label>
                          <Input
                            id="departure-date"
                            type="date"
                            value={formData.departureDate}
                            onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="transport" className="block text-sm font-medium">
                            Preferred Transport
                          </label>
                          <Select 
                            value={formData.transportType}
                            onValueChange={(value) => setFormData({...formData, transportType: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select transport type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bus">Standard Bus</SelectItem>
                              <SelectItem value="ac-bus">AC Bus</SelectItem>
                              <SelectItem value="train">Train</SelectItem>
                              <SelectItem value="custom">Custom Transport</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="notes" className="block text-sm font-medium">
                            Academic Requirements/Notes
                          </label>
                          <Textarea
                            id="notes"
                            placeholder="Specific academic goals, research requirements, or other needs"
                            value={formData.additionalNotes}
                            onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                            rows={4}
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                            Submit Trip Request
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  <Button 
                    onClick={calculateRoute} 
                    className="w-full bg-amber-600 hover:bg-amber-700 font-medium"
                    disabled={selectedDestinations.length < 2}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Optimize Route
                  </Button>
                  <Button 
                    onClick={calculateBudget} 
                    variant="outline"
                    className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-medium"
                    disabled={selectedDestinations.length === 0}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Calculate Budget Estimate
                  </Button>
                </div>
              </div>
              
              {/* Center Column - Destinations */}
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Select Destinations</CardTitle>
                    <CardDescription>
                      Choose destinations to include in your itinerary
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {destinations.map(destination => (
                        <div 
                          key={destination.id}
                          onClick={() => handleDestinationToggle(destination)}
                          className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                            selectedDestinations.some(d => d.id === destination.id) 
                              ? 'bg-amber-600 text-white scale-105 shadow-md' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {destination.image && (
                            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                              <img 
                                src={destination.image} 
                                alt={destination.name}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium">{destination.name}</h4>
                            <p className={`text-xs ${selectedDestinations.some(d => d.id === destination.id) ? 'text-white/80' : 'text-gray-500'}`}>
                              {destination.region} • {destination.bestTimeToVisit}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedDestinations.length > 0 && (
                      <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-medium mb-2 text-amber-800">Trip Statistics</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-amber-600" />
                            <span>{selectedDestinations.length} destinations selected</span>
                          </div>
                          {optimizedRoute.length > 0 && (
                            <>
                              <div className="flex items-center gap-2">
                                <Bus className="h-4 w-4 text-amber-600" />
                                <span>Total distance: {calculateTotalDistance(optimizedRoute)} km</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-600" />
                                <span>
                                  Est. travel time: {estimateTotalTravelTime(optimizedRoute, 'bus')} hours by bus
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-amber-600" />
                                <span>
                                  Recommended trip length: {Math.max(3, Math.ceil(selectedDestinations.length / 2))} days
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-amber-600" />
                                <span>
                                  Approximate per-student cost: ₹{Math.round(2500 * days + (selectedDestinations.length * 200))}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Map */}
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Trip Route Map</CardTitle>
                    <CardDescription>
                      {optimizedRoute.length > 0 
                        ? `Optimized route with ${optimizedRoute.length} destinations` 
                        : "Select destinations to view the route"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div id="tripMap" className="w-full h-[500px] rounded-lg overflow-hidden bg-gray-100"></div>
                    
                    {optimizedRoute.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium">Route Order:</h4>
                        <div className="space-y-2">
                          {optimizedRoute.map((place, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">
                                {index + 1}
                              </div>
                              <span>{place.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How far in advance should we book?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We recommend booking at least 2-3 months in advance for school trips and 1-2 months for college trips, especially during peak season (October-February).</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you provide teachers/professors with complimentary places?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Yes, we provide one complimentary place for every 15 students for teachers/professors and staff accompanying the group.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can you arrange special educational activities?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Absolutely! We can arrange curriculum-focused workshops, expert-guided tours, and interactive experiences tailored to your academic requirements.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What safety measures do you have in place?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>We maintain strict safety protocols including verified accommodations, certified transportation, 24/7 emergency support, and experienced guides trained in first aid.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolCollegeTrips;
