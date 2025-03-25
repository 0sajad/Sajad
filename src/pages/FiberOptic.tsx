
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FiberOpticDashboard } from "@/components/FiberOpticDashboard";

const FiberOptic = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main>
        <FiberOpticDashboard />
      </main>
      
      <Footer />
    </div>
  );
};

export default FiberOptic;
