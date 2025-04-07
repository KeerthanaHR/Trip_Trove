
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Camera, MapPin, UploadCloud } from 'lucide-react';

const CreatePost = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Login required",
        description: "Please log in to create a post",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, loading, navigate, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to create a post",
        variant: "destructive"
      });
      return;
    }
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and content for your post",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      let imageUrl = null;
      
      // Upload image if one was selected
      if (imageFile) {
        try {
          // Check if the bucket exists
          const { data: buckets } = await supabase.storage.listBuckets();
          const postsBucketExists = buckets?.some(bucket => bucket.name === 'posts');
          
          if (!postsBucketExists) {
            const { error: bucketError } = await supabase.storage.createBucket('posts', {
              public: true,
              fileSizeLimit: 10485760 // 10MB
            });
            
            if (bucketError) throw bucketError;
          }
          
          // Upload the image
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${user.id}-${Date.now()}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('posts')
            .upload(fileName, imageFile);
            
          if (uploadError) throw uploadError;
          
          // Get the public URL
          const { data: urlData } = supabase.storage
            .from('posts')
            .getPublicUrl(fileName);
            
          imageUrl = urlData.publicUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          toast({
            title: "Image upload failed",
            description: error instanceof Error ? error.message : "Unknown error",
            variant: "destructive"
          });
          // Continue without the image
        }
      }
      
      // Create the post
      const { data, error } = await supabase
        .from('posts')
        .insert([
          { 
            user_id: user.id,
            title, 
            content,
            location: location || null,
            image_url: imageUrl
          }
        ])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Post created!",
        description: "Your post has been published successfully"
      });
      
      // Navigate to the community page or post detail page
      navigate('/community');
      
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error creating post",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-amber-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-[30vh] min-h-[200px] w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')" 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-amber-800/70"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
                Share Your Adventure
              </h1>
              <p className="text-lg md:text-xl text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Create a post to share your Karnataka travels with the community
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Create a New Post</CardTitle>
              <CardDescription>
                Share your experiences, tips, and photos from your Karnataka adventures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your post a title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location
                  </label>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-amber-600 mr-2" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Where did you visit? (optional)"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell your story..."
                    rows={8}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="image" className="block text-sm font-medium">
                    Add an Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-md" 
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="absolute top-2 right-2 bg-white hover:bg-gray-100"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center hover:border-amber-500 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <div className="text-sm text-gray-600">
                        Click to upload an image
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG or GIF up to 10MB
                      </p>
                    </div>
                  )}
                  
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Publish Post
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreatePost;
