
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Calendar, CreditCard, PlusCircle, Trash2, Edit, ListChecks } from 'lucide-react';

type Trip = {
  id: string;
  trip_name: string;
  destinations: string[];
  budget: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  notes: string | null;
};

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // If the user is not logged in and we're done loading, redirect to auth page
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      // Fetch user's saved trips
      const fetchTrips = async () => {
        try {
          setLoadingData(true);
          const { data, error } = await supabase
            .from('trips')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          setTrips(data || []);
        } catch (error) {
          console.error('Error fetching trips:', error);
          toast({
            title: 'Failed to load trips',
            description: error instanceof Error ? error.message : 'Unknown error',
            variant: 'destructive',
          });
        } finally {
          setLoadingData(false);
        }
      };

      // Fetch user's posts
      const fetchPosts = async () => {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            throw error;
          }

          setPosts(data || []);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchTrips();
      fetchPosts();
    }
  }, [user, toast]);

  const handleDeleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId);

      if (error) {
        throw error;
      }

      // Update local state
      setTrips(trips.filter(trip => trip.id !== tripId));
      
      toast({
        title: 'Trip deleted',
        description: 'Your trip has been successfully deleted',
      });
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast({
        title: 'Failed to delete trip',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-teal-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[30vh] min-h-[200px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80')" 
            }}>
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/70 to-teal-800/70"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
                Your Dashboard
              </h1>
              <p className="text-lg md:text-xl text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Manage your trips, posts, and Karnataka travel plans
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="trips" className="space-y-8">
            <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="trips" className="text-base py-3">
                <ListChecks className="mr-2 h-5 w-5" />
                My Trips
              </TabsTrigger>
              <TabsTrigger value="posts" className="text-base py-3">
                <Edit className="mr-2 h-5 w-5" />
                My Posts
              </TabsTrigger>
            </TabsList>
            
            {/* Trips Tab */}
            <TabsContent value="trips" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Saved Trips</h2>
                <Button 
                  onClick={() => navigate('/plan')} 
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Plan New Trip
                </Button>
              </div>
              
              {loadingData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="bg-white shadow-md animate-pulse">
                      <div className="h-40 bg-gray-200"></div>
                      <CardHeader>
                        <div className="h-8 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : trips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <Card key={trip.id} className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-40 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-white font-medium text-sm">
                            {trip.destinations.length} {trip.destinations.length === 1 ? 'Destination' : 'Destinations'}
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{trip.trip_name}</CardTitle>
                        <CardDescription>
                          Created on {new Date(trip.created_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 text-teal-600 mr-2" />
                            <span>
                              {trip.destinations.length > 0 
                                ? trip.destinations.slice(0, 3).join(', ') + (trip.destinations.length > 3 ? ', ...' : '')
                                : 'No destinations specified'}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 text-teal-600 mr-2" />
                            <span>
                              {trip.start_date 
                                ? `${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`
                                : 'Dates not specified'}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <CreditCard className="h-4 w-4 text-teal-600 mr-2" />
                            <span>Budget: ₹{trip.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button 
                          variant="outline" 
                          className="border-teal-600 text-teal-600 hover:bg-teal-50"
                          onClick={() => navigate(`/plan?tripId=${trip.id}`)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDeleteTrip(trip.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-10 w-10 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No trips saved yet</h3>
                  <p className="text-gray-500 mb-6">Start planning your Karnataka adventure!</p>
                  <Button 
                    onClick={() => navigate('/plan')} 
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Plan Your First Trip
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Your Community Posts</h2>
                <Button 
                  onClick={() => navigate('/community')} 
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create New Post
                </Button>
              </div>
              
              {posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-white shadow-md">
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>
                          Posted on {new Date(post.created_at).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{post.content.substring(0, 150)}...</p>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-between">
                        <Button 
                          variant="outline" 
                          className="border-teal-600 text-teal-600 hover:bg-teal-50"
                          onClick={() => navigate(`/community/post/${post.id}`)}
                        >
                          View Full Post
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={() => {
                            // Delete post functionality
                            toast({
                              title: "Post deleted",
                              description: "Your post has been removed",
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Edit className="h-10 w-10 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-6">Share your Karnataka adventures with the community!</p>
                  <Button 
                    onClick={() => navigate('/community')} 
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Create Your First Post
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
