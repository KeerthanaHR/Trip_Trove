
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunitySection = () => {
  const features = [
    {
      title: "Travel Forums",
      description: "Engage in discussions, ask questions, and share advice with fellow travelers about Karnataka tourism.",
      icon: <MessageSquare className="h-12 w-12 text-amber-600 mb-4" />,
      link: "/community/forums"
    },
    {
      title: "Travel Stories",
      description: "Read and share personal travel experiences, photos, and tips from journeys across Karnataka.",
      icon: <BookOpen className="h-12 w-12 text-amber-600 mb-4" />,
      link: "/community/stories"
    },
    {
      title: "Meetups & Events",
      description: "Find travel companions, join group tours, or attend community events and travel meetups.",
      icon: <Calendar className="h-12 w-12 text-amber-600 mb-4" />,
      link: "/community/events"
    },
    {
      title: "Group Trips",
      description: "Plan and organize group trips for schools, colleges, and other organizations with special discounts.",
      icon: <Users className="h-12 w-12 text-amber-600 mb-4" />,
      link: "/community/group-trips"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800">Join Our Travel Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded travelers, share your experiences, and discover insider tips for exploring Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-all border-amber-100 h-full">
              <CardHeader>
                <div className="flex justify-center">{feature.icon}</div>
                <CardTitle className="text-amber-800">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Link to={feature.link}>
                  <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-100">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-amber-100/50 rounded-lg border border-amber-200/50">
          <h3 className="text-2xl font-semibold mb-4 text-amber-800">Special Services for School & College Trips</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            We offer specialized planning services for educational institutions organizing trips to Karnataka's cultural and heritage sites. 
            Enjoy group discounts, educational guides, and tailored itineraries.
          </p>
          <Link to="/school-college-trips">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full">
              Plan Educational Trips
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
