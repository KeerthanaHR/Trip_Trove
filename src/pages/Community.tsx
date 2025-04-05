
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, BookOpen, Calendar, Users, Clock, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Community = () => {
  // Sample data for community features
  const forumTopics = [
    {
      id: 1,
      title: "Best time to visit Coorg for students?",
      author: "Rahul S",
      replies: 24,
      lastActive: "2 hours ago",
      tags: ["Coorg", "School Trip", "Weather"]
    },
    {
      id: 2,
      title: "Transport options from Bangalore to Hampi",
      author: "Priya M",
      replies: 18,
      lastActive: "1 day ago",
      tags: ["Hampi", "Transportation", "Budget Travel"]
    },
    {
      id: 3,
      title: "Planning a 3-day trip to Mysore for college students",
      author: "Akash K",
      replies: 32,
      lastActive: "3 hours ago",
      tags: ["Mysore", "College Trip", "Budget"]
    },
    {
      id: 4,
      title: "What to pack for Badami Cave visit in December?",
      author: "Meera R",
      replies: 12,
      lastActive: "5 days ago",
      tags: ["Badami", "Winter", "Packing"]
    }
  ];
  
  const travelStories = [
    {
      id: 1,
      title: "Our Engineering Department's Unforgettable Trip to Hampi",
      author: "Prof. Suresh Kumar",
      excerpt: "Last month, our final year engineering students embarked on an educational trip to Hampi that combined history, architecture, and team building...",
      image: "https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      date: "May 15, 2023",
      likes: 145
    },
    {
      id: 2,
      title: "A Geography Student's Guide to Coorg's Ecosystem",
      author: "Neha Sharma",
      excerpt: "As geography students, our recent field trip to Coorg offered fascinating insights into the region's unique ecosystem and agricultural practices...",
      image: "https://images.unsplash.com/photo-1580891587477-3ab84d823a39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29vcmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
      date: "June 3, 2023",
      likes: 98
    },
    {
      id: 3,
      title: "How Our School Organized a Cultural Tour of Mysore Palace",
      author: "Rajesh Patil",
      excerpt: "Planning a school trip for 120 students was no small feat. Here's how we organized a memorable educational tour to Mysore Palace and surrounding attractions...",
      image: "https://images.unsplash.com/photo-1600100598629-200722fda2fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      date: "April 22, 2023",
      likes: 156
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Photography Workshop at Badami Caves",
      date: "June 25, 2023",
      location: "Badami, Karnataka",
      attendees: 38,
      type: "Workshop"
    },
    {
      id: 2,
      title: "Karnataka Heritage Walk: Mysore Edition",
      date: "July 8-9, 2023",
      location: "Mysore, Karnataka",
      attendees: 65,
      type: "Tour"
    },
    {
      id: 3,
      title: "Educational Trek: Coorg Biodiversity Trail",
      date: "July 15, 2023",
      location: "Coorg, Karnataka",
      attendees: 42,
      type: "Educational"
    },
    {
      id: 4,
      title: "College Student Meetup: Beach Cleanup at Gokarna",
      date: "July 22, 2023",
      location: "Gokarna, Karnataka",
      attendees: 87,
      type: "Volunteering"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[30vh] min-h-[250px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1612977512598-3b8d6a363e27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwZ3JvdXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')" 
            }}>
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Karnataka Travel Community
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">
                Connect with fellow travelers, share experiences, and plan your next adventure together
              </p>
            </div>
          </div>
        </div>
        
        {/* Community Hub Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="forums" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="forums" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Forums
                  </TabsTrigger>
                  <TabsTrigger value="stories" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Travel Stories
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Events & Meetups
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> School & College Groups
                  </TabsTrigger>
                </TabsList>
                
                <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white hidden md:flex">
                  Create Post
                </Button>
              </div>
              
              {/* Forums Tab */}
              <TabsContent value="forums">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Discussion Forums</CardTitle>
                        <CardDescription>
                          Join conversations, ask questions, and share advice with fellow travelers
                        </CardDescription>
                      </div>
                      <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white md:hidden">
                        Create Post
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {forumTopics.map(topic => (
                        <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:border-karnataka-orange transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-lg">{topic.title}</h3>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                              {topic.replies} replies
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>{topic.author}</span>
                              <span>•</span>
                              <Clock className="h-4 w-4" />
                              <span>{topic.lastActive}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {topic.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-karnataka-cream px-2 py-1 rounded-full text-karnataka-blue">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                        View All Discussion Topics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Travel Stories Tab */}
              <TabsContent value="stories">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Travel Stories</CardTitle>
                        <CardDescription>
                          Read and share personal travel experiences from Karnataka adventures
                        </CardDescription>
                      </div>
                      <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white md:hidden">
                        Share Your Story
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {travelStories.map(story => (
                        <Card key={story.id} className="overflow-hidden border-gray-200 hover:border-karnataka-orange transition-colors">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={story.image} 
                              alt={story.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{story.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span>{story.author}</span>
                              <span>•</span>
                              <Calendar className="h-4 w-4" />
                              <span>{story.date}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {story.excerpt}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="ghost" className="text-karnataka-orange hover:text-karnataka-terracotta hover:bg-karnataka-cream">
                              Read More
                            </Button>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-karnataka-orange">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                              </svg>
                              {story.likes}
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                        View All Stories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Events & Meetups Tab */}
              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Events & Meetups</CardTitle>
                        <CardDescription>
                          Join upcoming travel events, workshops, and community gatherings
                        </CardDescription>
                      </div>
                      <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white md:hidden">
                        Create Event
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:border-karnataka-orange transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-karnataka-cream text-xs rounded-full text-karnataka-blue">
                                  {event.type}
                                </span>
                              </div>
                              <h3 className="font-medium text-lg mb-2">{event.title}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 text-karnataka-orange" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-4 w-4 text-karnataka-orange" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 text-karnataka-orange" />
                                  <span>{event.attendees} attending</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Button className="bg-karnataka-orange hover:bg-karnataka-terracotta text-white">
                                Join Event
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Button variant="outline" className="border-karnataka-orange text-karnataka-orange hover:bg-karnataka-orange hover:text-white">
                        View All Events
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* School & College Groups Tab */}
              <TabsContent value="groups">
                <Card>
                  <CardHeader>
                    <CardTitle>School & College Trip Planning</CardTitle>
                    <CardDescription>
                      Special services for educational institutions planning trips in Karnataka
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">For Schools</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-karnataka-cream flex items-center justify-center shrink-0">
                              <span className="font-semibold text-karnataka-orange">1</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Educational Trips</h4>
                              <p className="text-muted-foreground text-sm">
                                Curriculum-aligned trips to historical and cultural sites with educational guides and activities.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-karnataka-cream flex items-center justify-center shrink-0">
                              <span className="font-semibold text-karnataka-orange">2</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Group Discounts</h4>
                              <p className="text-muted-foreground text-sm">
                                Special rates for school groups with complimentary teacher accommodations.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-karnataka-cream flex items-center justify-center shrink-0">
                              <span className="font-semibold text-karnataka-orange">3</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Safety Measures</h4>
                              <p className="text-muted-foreground text-sm">
                                Enhanced safety protocols with trained guides and 24/7 support for school groups.
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button className="mt-6 bg-karnataka-orange hover:bg-karnataka-terracotta text-white w-full">
                          Plan School Trip
                        </Button>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-4">For Colleges</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-karnataka-cream flex items-center justify-center shrink-0">
                              <span className="font-semibold text-karnataka-orange">1</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Field Studies</h4>
                              <p className="text-muted-foreground text-sm">
                                Specialized trips for engineering, architecture, geography, and history departments with subject experts.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-karnataka-cream flex items-center justify-center shrink-0">
                              <span className="font-semibold text-karnataka-orange">2</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Custom Itineraries</h4>
                              <p className="text-muted-foreground text-sm">
                                Tailor-made trips based on academic requirements and learning objectives.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-karnataka-cream flex items-center justify-center shrink-0">
                              <span className="font-semibold text-karnataka-orange">3</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Budget Options</h4>
                              <p className="text-muted-foreground text-sm">
                                Cost-effective packages with flexible accommodation options for student budgets.
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button className="mt-6 bg-karnataka-orange hover:bg-karnataka-terracotta text-white w-full">
                          Plan College Trip
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-12 p-6 bg-karnataka-cream rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Get a Custom Quote for Your Institution</h3>
                      <p className="text-muted-foreground mb-6">
                        Fill out our detailed form to receive a personalized quote for your educational trip to Karnataka.
                        Our team will contact you within 24 hours to discuss your requirements.
                      </p>
                      <div className="flex justify-center">
                        <Button className="bg-karnataka-blue hover:bg-karnataka-blue/90 text-white">
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
