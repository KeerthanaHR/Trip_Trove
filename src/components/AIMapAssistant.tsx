
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Send, Search, Map, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { destinations } from '@/data/karnataka-destinations';

// Define the message type
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AIMapAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your Karnataka travel assistant. Ask me about places to visit, travel tips, or help planning your itinerary!' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(destinations);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Function to scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Search function
  useEffect(() => {
    if (searchTerm) {
      const filtered = destinations.filter(
        dest => dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
               dest.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(destinations);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search already handled by useEffect
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the OpenAI function
      const { data, error } = await supabase.functions.invoke('map-assistant', {
        body: { 
          messages: [...messages, userMessage],
          user_id: user?.id || 'anonymous'
        }
      });

      if (error) throw error;

      if (data && data.message) {
        // Add AI response to the chat
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      }
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
        }
      ]);
      
      toast({
        title: 'Connection Error',
        description: 'Could not connect to the AI service. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Plan with AI & Maps</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search for destinations, ask our AI for recommendations, and plan your perfect Karnataka trip
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search and Map Section */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-teal-600" />
                  Find Destinations
                </CardTitle>
                <CardDescription>
                  Search Karnataka's top attractions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    placeholder="Search places..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
                
                <div className="h-96 overflow-y-auto border rounded-md">
                  {searchResults.length > 0 ? (
                    <div className="divide-y">
                      {searchResults.map((destination) => (
                        <div key={destination.id} className="p-3 hover:bg-gray-50">
                          <div className="font-medium">{destination.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" /> {destination.region}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No destinations found
                    </div>
                  )}
                </div>
                
                <div className="pt-2 flex justify-center">
                  <Button className="bg-teal-600 hover:bg-teal-700 w-full">
                    <Map className="mr-2 h-4 w-4" />
                    Open in Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AI Assistant Chat */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>AI Travel Assistant</CardTitle>
                <CardDescription>
                  Chat with our AI to get personalized travel recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div 
                  ref={chatContainerRef}
                  className="h-96 overflow-y-auto border rounded-md p-4 mb-4 bg-gray-50"
                >
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.role === 'assistant' 
                          ? 'text-left' 
                          : 'text-right'
                      }`}
                    >
                      <div
                        className={`inline-block px-4 py-2 rounded-lg ${
                          message.role === 'assistant'
                            ? 'bg-white text-gray-800 shadow-sm'
                            : 'bg-teal-600 text-white'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="text-left mb-4">
                      <div className="inline-block px-4 py-2 rounded-lg bg-white text-gray-800 shadow-sm">
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-end gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about places to visit, travel tips, or itinerary help..."
                    className="resize-none"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="bg-teal-600 hover:bg-teal-700 h-10 w-10 p-2"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMapAssistant;
