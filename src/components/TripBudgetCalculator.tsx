
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calculator, Users, Calendar, Car, Hotel, Utensils } from 'lucide-react';

const TripBudgetCalculator = () => {
  const [numPeople, setNumPeople] = useState(30);
  const [numDays, setNumDays] = useState(3);
  const [transportMode, setTransportMode] = useState('bus');
  const [accommodationType, setAccommodationType] = useState('budget');
  const [mealBudget, setMealBudget] = useState('medium');
  const [activities, setActivities] = useState(['sightseeing']);
  const [totalBudget, setTotalBudget] = useState<number | null>(null);

  // Base rates for different options
  const transportRates: Record<string, number> = {
    bus: 500,    // per person per day
    train: 750,  // per person per day
    car: 1200    // per person per day
  };

  const accommodationRates: Record<string, number> = {
    budget: 800,    // per person per night
    standard: 1500, // per person per night
    premium: 3000   // per person per night
  };

  const mealRates: Record<string, number> = {
    basic: 300,   // per person per day
    medium: 600,  // per person per day
    premium: 1200 // per person per day
  };

  const activityRates: Record<string, number> = {
    sightseeing: 300,
    adventure: 800,
    cultural: 500,
    workshops: 600
  };

  const calculateBudget = () => {
    // Transport cost
    const transportCost = transportRates[transportMode] * numPeople;
    
    // Accommodation cost
    const accommodationCost = accommodationRates[accommodationType] * numPeople * numDays;
    
    // Meal cost
    const mealCost = mealRates[mealBudget] * numPeople * numDays;
    
    // Activities cost
    let activitiesCost = 0;
    activities.forEach(activity => {
      activitiesCost += activityRates[activity] * numPeople;
    });
    
    // Calculate total
    const total = transportCost + accommodationCost + mealCost + activitiesCost;
    
    // Add 10% contingency
    const withContingency = total * 1.1;
    
    setTotalBudget(Math.round(withContingency));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-teal-50 to-karnataka-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-800">School & College Trip Budget Calculator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plan your educational trip with our budget calculator to get an estimate of costs for your group.
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto shadow-lg border-teal-100">
          <CardHeader className="bg-teal-50 border-b border-teal-100">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-teal-600" />
              Trip Budget Planner
            </CardTitle>
            <CardDescription>
              Adjust the parameters below to get an estimate for your educational trip
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="group-size" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-teal-600" />
                    Group Size
                  </Label>
                  <span className="font-medium text-lg">{numPeople} people</span>
                </div>
                <Slider 
                  id="group-size"
                  min={10} 
                  max={100} 
                  step={5} 
                  value={[numPeople]} 
                  onValueChange={(value) => setNumPeople(value[0])}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">Number of students and staff</p>
              </div>
              
              {/* Trip Duration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    Trip Duration
                  </Label>
                  <span className="font-medium text-lg">{numDays} days</span>
                </div>
                <Slider 
                  id="duration"
                  min={1} 
                  max={10} 
                  step={1} 
                  value={[numDays]} 
                  onValueChange={(value) => setNumDays(value[0])}
                  className="py-4"
                />
                <p className="text-sm text-muted-foreground">Number of days for the trip</p>
              </div>
              
              {/* Transportation */}
              <div className="space-y-3">
                <Label htmlFor="transport" className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-teal-600" />
                  Transportation
                </Label>
                <Select value={transportMode} onValueChange={setTransportMode}>
                  <SelectTrigger id="transport">
                    <SelectValue placeholder="Select transportation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bus">Bus (₹500 per person)</SelectItem>
                    <SelectItem value="train">Train (₹750 per person)</SelectItem>
                    <SelectItem value="car">Private Cars (₹1200 per person)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Mode of transportation for the trip</p>
              </div>
              
              {/* Accommodation */}
              <div className="space-y-3">
                <Label htmlFor="accommodation" className="flex items-center gap-2">
                  <Hotel className="h-4 w-4 text-teal-600" />
                  Accommodation
                </Label>
                <Select value={accommodationType} onValueChange={setAccommodationType}>
                  <SelectTrigger id="accommodation">
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget Hostel (₹800 per night)</SelectItem>
                    <SelectItem value="standard">Standard Hotel (₹1500 per night)</SelectItem>
                    <SelectItem value="premium">Premium Resort (₹3000 per night)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Type of accommodation for the stay</p>
              </div>
              
              {/* Meals */}
              <div className="space-y-3">
                <Label htmlFor="meals" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-teal-600" />
                  Meal Budget
                </Label>
                <Select value={mealBudget} onValueChange={setMealBudget}>
                  <SelectTrigger id="meals">
                    <SelectValue placeholder="Select meal budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Meals (₹300 per day)</SelectItem>
                    <SelectItem value="medium">Standard Meals (₹600 per day)</SelectItem>
                    <SelectItem value="premium">Premium Meals (₹1200 per day)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Budget allocation for meals per person</p>
              </div>
              
              {/* Activity Types */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  Activities & Workshops
                </Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(activityRates).map(([activity, rate]) => (
                    <Button
                      key={activity}
                      type="button"
                      variant={activities.includes(activity) ? "default" : "outline"}
                      className={activities.includes(activity) ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => {
                        if (activities.includes(activity)) {
                          setActivities(activities.filter(a => a !== activity));
                        } else {
                          setActivities([...activities, activity]);
                        }
                      }}
                    >
                      {activity.charAt(0).toUpperCase() + activity.slice(1)} (₹{rate})
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Select activity types for your trip</p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col items-center">
              <Button 
                onClick={calculateBudget}
                className="bg-teal-600 hover:bg-teal-700 text-white py-6 px-8 text-lg w-full max-w-md"
              >
                Calculate Budget
              </Button>
              
              {totalBudget !== null && (
                <div className="mt-6 p-6 bg-teal-50 rounded-lg text-center w-full max-w-md border border-teal-100">
                  <p className="text-sm text-teal-600 uppercase font-semibold">Estimated Total Budget</p>
                  <p className="text-4xl font-bold text-teal-800 mt-2">₹{totalBudget.toLocaleString()}</p>
                  <p className="text-sm text-teal-600 mt-1">For {numPeople} people, {numDays} days</p>
                  <p className="text-xs text-muted-foreground mt-4">
                    This estimate includes a 10% contingency buffer. Actual costs may vary based on seasonal pricing and availability.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TripBudgetCalculator;
