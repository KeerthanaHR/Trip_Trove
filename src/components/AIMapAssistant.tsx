
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Send, Bot, Compass, RotateCcw, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIMapAssistant = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m your Karnataka travel assistant. Ask me about places to visit, routes, or travel recommendations in Karnataka. I can help you discover heritage sites, natural wonders, and cultural experiences!',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the OpenAI edge function
      const response = await supabase.functions.invoke('map-assistant', {
        body: {
          query,
          userLocation: location,
          context: 'Karnataka travel planning'
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Add AI response
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m your Karnataka travel assistant. How can I help you plan your journey?',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800">Karnataka AI Travel Assistant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized travel recommendations, optimal routes, and discover hidden gems across Karnataka
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto shadow-lg overflow-hidden border-indigo-100">
          <CardHeader className="bg-indigo-50 border-b border-indigo-100">
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Bot className="h-6 w-6" />
              AI Travel Guide
            </CardTitle>
            <CardDescription>
              Powered by OpenAI to help you explore Karnataka
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="h-[400px] overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div 
                        className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-indigo-200' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-indigo-100 p-4 bg-white">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="flex gap-2">
                <div className="w-full">
                  <Label htmlFor="location" className="sr-only">Your location or context</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Your current location (optional)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetConversation}
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Label htmlFor="query" className="sr-only">Ask about Karnataka</Label>
                  <Textarea
                    id="query"
                    placeholder="Ask about places to visit, routes between destinations, or travel recommendations..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="self-end bg-indigo-600 hover:bg-indigo-700 h-[60px] w-[60px]"
                  disabled={isLoading || !query.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Suggested queries:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    "What are the must-visit places in Mysore?",
                    "Best route from Bangalore to Coorg?",
                    "Historical sites in Hampi",
                    "Family-friendly destinations in Karnataka"
                  ].map((suggestion, i) => (
                    <Button
                      key={i}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      onClick={() => setQuery(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </form>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default AIMapAssistant;
