
import React from 'react';
import { Link } from 'react-router-dom';
import { allDestinations } from '@/data/karnataka-destinations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Calendar, Star } from 'lucide-react';

const FeaturedDestinations = () => {
  // Choose destinations that have images
  const featuredDestinations = allDestinations
    .filter(d => d.image && d.image.length > 0)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4); // Increased from 3 to 4

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/40 to-orange-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800">Explore Enchanting Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the cultural richness and natural beauty of Karnataka's top tourist spots,
            from ancient temples to royal palaces and pristine beaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-amber-100 h-full">
              <div className="h-52 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl text-amber-800">{destination.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1 text-amber-600" />
                    <span>{destination.region}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {destination.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4 mr-1 text-amber-600" />
                  <span>Best time: {destination.bestTimeToVisit}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destination.category.slice(0, 3).map((category, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/destination/${destination.id}`} className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                  >
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/explore">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
