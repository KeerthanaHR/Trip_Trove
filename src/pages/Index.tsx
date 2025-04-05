
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import CommunitySection from '@/components/CommunitySection';
import MapSection from '@/components/MapSection';
import TestimonialSection from '@/components/TestimonialSection';
import TripBudgetCalculator from '@/components/TripBudgetCalculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedDestinations />
        <MapSection />
        <TripBudgetCalculator />
        <CommunitySection />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
