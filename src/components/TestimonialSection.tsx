
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { User } from 'lucide-react';

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "College Professor",
    text: "Trip Trove made organizing our department trip to Hampi incredibly easy! The route planning feature saved us hours of work, and the students were thrilled with the detailed historical information provided about each site.",
    avatar: null
  },
  {
    name: "Priya Sharma",
    role: "Travel Enthusiast",
    text: "I've been exploring Karnataka for years, but Trip Trove helped me discover hidden gems I hadn't even heard of! The community forums are full of helpful locals sharing insider tips you won't find in guidebooks.",
    avatar: null
  },
  {
    name: "Michael D'Souza",
    role: "School Trip Coordinator",
    text: "Planning our annual school trip was a breeze with Trip Trove. The educational focus of the platform helped me create a perfectly balanced itinerary that was both fun and educational for our students.",
    avatar: null
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read about the experiences of travelers and educational institutions who have used Trip Trove to plan their Karnataka journeys.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-karnataka-cream flex items-center justify-center">
                      <User className="h-6 w-6 text-karnataka-orange" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic text-gray-600">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
