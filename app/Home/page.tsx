import dynamic from "next/dynamic";
import React from "react";

const FeaturesSection = dynamic(() => import("@/components/Landing/Features"));
const HeroSection = dynamic(() => import("@/components/Landing/Hero"));
const Navbar = dynamic(() => import("@/components/Landing/Navbar"));
const PricingSection = dynamic(() => import("@/components/Landing/Pricing/PricingSection"));
const WhyUs = dynamic(() => import("@/components/Landing/WhyUs"));
const WorkTogetherSection = dynamic(() => import("@/components/Landing/WorkTogether"));
const Footer = dynamic(() => import("@/components/Landing/footer/Footer"));

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
