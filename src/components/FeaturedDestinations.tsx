
import React from 'react';
import { Link } from 'react-router-dom';
import { destinations } from '@/data/karnataka-destinations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

const FeaturedDestinations = () => {
  // Choose destinations that have images
  const featuredDestinations = destinations
    .filter(d => d.image && d.image.length > 0)
    .slice(0, 3);

  return (
    <section className="py-16 bg-karnataka-cream/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-karnataka-blue">Explore Popular Destinations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the cultural richness and natural beauty of Karnataka's top tourist spots,
            from ancient temples to royal palaces and pristine beaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-karnataka-cream/40">
              <div className="h-52 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl text-karnataka-blue">{destination.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1 text-karnataka-orange" />
                    <span>{destination.region}</span>
                  </div>
                </div>
                <CardDescription>
                  {destination.shortDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {destination.category.slice(0, 3).map((category, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-karnataka-cream text-karnataka-blue"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/destination/${destination.id}`} className="w-full">
                  <Button variant="outline" className="w-full border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                    View Details <ArrowRight className="ml-2 w-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/explore">
            <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
