
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Users, School, ClipboardCheck, SquarePen, RouteIcon } from 'lucide-react';
import { destinations } from '@/data/karnataka-destinations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const popularDestinationsForSchools = [
  { id: "mysore", name: "Mysore Palace", description: "Historical palace with educational value" },
  { id: "hampi", name: "Hampi", description: "UNESCO World Heritage Site with rich history" },
  { id: "bandipur", name: "Bandipur National Park", description: "Wildlife education and nature studies" },
  { id: "jog-falls", name: "Jog Falls", description: "Geography and natural sciences excursion" },
  { id: "belur", name: "Belur", description: "Architecture and historical studies" },
];

const EducationalTrips = [
  {
    title: "Historical Karnataka",
    days: 3,
    destinations: ["Mysore Palace", "Hampi", "Badami Cave Temples"],
    subjects: ["History", "Art", "Architecture"],
    ageGroups: "Classes 8-12",
    description: "Explore Karnataka's rich historical heritage through its palaces, temples, and archaeological sites."
  },
  {
    title: "Wildlife & Biodiversity Explorer",
    days: 4,
    destinations: ["Bandipur National Park", "Coorg", "Kabini"],
    subjects: ["Biology", "Environmental Science", "Geography"],
    ageGroups: "Classes 6-12",
    description: "Hands-on learning about wildlife conservation, biodiversity, and ecosystems."
  },
  {
    title: "Science & Technology Tour",
    days: 2,
    destinations: ["Bangalore Science Museum", "ISRO Space Exhibition", "Innovative Film City"],
    subjects: ["Physics", "Astronomy", "Technology"],
    ageGroups: "Classes 9-12",
    description: "Engaging experiences with scientific principles and technological advancements."
  },
  {
    title: "Cultural Karnataka",
    days: 3,
    destinations: ["Mysore", "Udupi", "Pattadakal"],
    subjects: ["Social Studies", "Cultural Studies", "Languages"],
    ageGroups: "Classes 5-10",
    description: "Immersion in diverse cultural traditions, arts, crafts, and cuisines of Karnataka."
  }
];

const SchoolTripPlanner = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentCount: '',
    preferredDates: '',
    destinationInterests: '',
    additionalRequirements: ''
  });

  const { toast } = useToast();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Trip Inquiry Submitted",
      description: "Thank you for your interest! Our educational trip specialist will contact you within 24 hours.",
    });
    setFormData({
      schoolName: '',
      contactPerson: '',
      email: '',
      phone: '',
      studentCount: '',
      preferredDates: '',
      destinationInterests: '',
      additionalRequirements: ''
    });
  };

  return (
    <section className="school-trip-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block p-2 px-4 bg-teal-100 rounded-full text-teal-700 text-sm font-medium mb-4">
            Educational Excursions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">School & College Trip Planning</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Organize enriching educational trips for your students with our specialized planning services.
            We create curriculum-aligned experiences that combine learning with excitement.
          </p>
        </div>
        
        <Tabs defaultValue="explore" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="explore" className="text-base py-3">
              <ClipboardCheck className="mr-2 h-5 w-5" />
              Popular Trips
            </TabsTrigger>
            <TabsTrigger value="customize" className="text-base py-3">
              <SquarePen className="mr-2 h-5 w-5" />
              Customize Trip
            </TabsTrigger>
            <TabsTrigger value="destinations" className="text-base py-3">
              <MapPin className="mr-2 h-5 w-5" />
              Best Destinations
            </TabsTrigger>
          </TabsList>
          
          {/* Popular Educational Trips Tab */}
          <TabsContent value="explore" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EducationalTrips.map((trip, index) => (
                <Card key={index} className="school-trip-card">
                  <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                    <CardTitle>{trip.title}</CardTitle>
                    <CardDescription className="text-white/90">
                      {trip.days} Days • {trip.ageGroups}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Destinations</h4>
                        <div className="flex flex-wrap gap-2">
                          {trip.destinations.map((dest, i) => (
                            <div key={i} className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700">
                              <MapPin className="h-3 w-3" />
                              {dest}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Curriculum Subjects</h4>
                        <div className="flex flex-wrap gap-2">
                          {trip.subjects.map((subject, i) => (
                            <span key={i} className="bg-teal-50 px-3 py-1 rounded-full text-sm text-teal-700">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-600">{trip.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                      View Details
                    </Button>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      Request Quote
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Customize Trip Tab */}
          <TabsContent value="customize" className="animate-float-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5 text-teal-600" />
                  Custom Trip Inquiry
                </CardTitle>
                <CardDescription>
                  Tell us about your school and trip requirements, and we'll design a custom educational experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School/College Name</Label>
                      <Input 
                        id="schoolName" 
                        name="schoolName" 
                        value={formData.schoolName}
                        onChange={handleFormChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPerson">Contact Person</Label>
                      <Input 
                        id="contactPerson" 
                        name="contactPerson" 
                        value={formData.contactPerson}
                        onChange={handleFormChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleFormChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleFormChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="studentCount">Number of Students</Label>
                      <Input 
                        id="studentCount" 
                        name="studentCount" 
                        type="number" 
                        value={formData.studentCount}
                        onChange={handleFormChange}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preferredDates">Preferred Dates</Label>
                      <Input 
                        id="preferredDates" 
                        name="preferredDates" 
                        value={formData.preferredDates}
                        onChange={handleFormChange}
                        placeholder="Month or specific dates" 
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="destinationInterests">Destination Interests</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destinations" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations.slice(0, 10).map(destination => (
                            <SelectItem key={destination.id} value={destination.id}>
                              {destination.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                      <Textarea 
                        id="additionalRequirements" 
                        name="additionalRequirements" 
                        value={formData.additionalRequirements}
                        onChange={handleFormChange}
                        rows={4} 
                        placeholder="Tell us about curriculum ties, specific learning objectives, accommodation preferences, etc." 
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Best Destinations for School Trips Tab */}
          <TabsContent value="destinations" className="animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularDestinationsForSchools.map((dest) => {
                const fullDestination = destinations.find(d => d.id === dest.id);
                return (
                  <Card key={dest.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={fullDestination?.image} 
                        alt={dest.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{dest.name}</CardTitle>
                      <CardDescription>{dest.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        {fullDestination?.shortDescription.substring(0, 100)}...
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {fullDestination?.category.slice(0, 2).map((cat, idx) => (
                          <span key={idx} className="bg-blue-50 px-2 py-1 rounded-full text-xs text-blue-700">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="outline" className="w-full border-karnataka-blue text-karnataka-blue hover:bg-karnataka-blue/10">
                        Educational Details
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Why Choose Karnataka for Educational Trips?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <School className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Curriculum Connections</h4>
                    <p className="text-sm text-gray-600">
                      Destinations that align with various subjects from history to science
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Group-Friendly</h4>
                    <p className="text-sm text-gray-600">
                      Accommodations and activities suitable for student groups
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <RouteIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Accessible Routes</h4>
                    <p className="text-sm text-gray-600">
                      Well-connected destinations with reliable transportation options
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SchoolTripPlanner;
