
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import CommunitySection from '@/components/CommunitySection';
import MapSection from '@/components/MapSection';
import TestimonialSection from '@/components/TestimonialSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection 
          title="Explore Karnataka"
          subtitle="Discover the beauty and culture of Karnataka with our travel platform."
          backgroundImage="https://images.unsplash.com/photo-1605649461784-efd458e87436?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFtcGklMjBpbmRpYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        />
        <FeaturedDestinations />
        <MapSection />
        <CommunitySection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
