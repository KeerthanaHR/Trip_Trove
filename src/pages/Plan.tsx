
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import TripBudgetCalculator from '@/components/TripBudgetCalculator';
import SchoolTripPlanner from '@/components/SchoolTripPlanner';

const Plan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsJTIwcGxhbm5pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')" 
            }}>
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          
          <div className="container relative h-full mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Plan Your Karnataka Adventure
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Create custom itineraries, calculate your travel budget, and find the optimal routes for your journey.
              </p>
            </div>
          </div>
        </div>
        
        <MapSection />
        <TripBudgetCalculator />
        <SchoolTripPlanner />
      </main>
      <Footer />
    </div>
  );
};

export default Plan;
