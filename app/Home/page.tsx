
import FeaturesSection from "@/components/Landing/Features";
import HeroSection from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import PricingSection from "@/components/Landing/Pricing/PricingSection";
import WhyUs from "@/components/Landing/WhyUs";
import WorkTogetherSection from "@/components/Landing/WorkTogether";
import Footer from "@/components/Landing/footer/Footer";
import React from "react";

const HomePage: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col items-center p-5 gap-5">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WorkTogetherSection />
      <WhyUs />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default HomePage;
