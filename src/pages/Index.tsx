
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { NetworkDashboard } from "@/components/NetworkDashboard";
import { AnimatedCards } from "@/components/AnimatedCards";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowDown, BrainCircuit, Layers, Shield } from "lucide-react";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="absolute -z-10 top-0 left-0 right-0 h-screen bg-gradient-to-b from-white via-white/80 to-transparent" />
        
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-octaBlue-50 text-octaBlue-600 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-octaBlue-600 mr-2 animate-pulse"></span>
            Professional Network Analysis System
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            OCTA-GRAM
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Advanced network monitoring, analysis, and optimization with AI-powered intelligence.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="action-button flex items-center">
              <span>Start Monitoring</span>
            </button>
            <button className="secondary-button flex items-center">
              <span>Learn More</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <a 
            href="#dashboard" 
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-float"
          >
            <ArrowDown size={20} className="text-octaBlue-600" />
          </a>
        </div>
      </section>
      
      {/* Network Dashboard Section */}
      <NetworkDashboard />
      
      {/* Features Section */}
      <AnimatedCards />
      
      {/* AI Features Section */}
      <section id="ai-features" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Intelligence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced artificial intelligence to predict, optimize, and secure your network.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-8 animate-fade-in">
              <div className="p-4 rounded-xl bg-purple-50 inline-block mb-6">
                <BrainCircuit size={28} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Network Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Our AI continuously analyzes network patterns to identify abnormalities, predict failures, and optimize performance automatically.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>Abnormal usage detection</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>Proactive error prediction</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>Automatic network adjustments</span>
                </li>
              </ul>
            </GlassCard>
            
            <GlassCard className="p-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="p-4 rounded-xl bg-amber-50 inline-block mb-6">
                <Shield size={28} className="text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Predictive Security</h3>
              <p className="text-muted-foreground mb-6">
                Advanced threat detection and prevention powered by machine learning algorithms that learn and adapt to evolving security threats.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>Zero-day threat detection</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>Behavioral analysis</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <span>Automated security responses</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>
      
      {/* Settings Section */}
      <section id="settings" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Extensive Customization</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Configure every aspect of OCTA-GRAM to meet your specific network management needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">General Settings</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm">Display Options</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">4K Support</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Animations</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Customizable</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Updates</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Automatic</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Language & Region</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">7 Languages</span>
                </li>
              </ul>
            </GlassCard>
            
            <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-semibold mb-4">UI Settings</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm">Element Density</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Adjustable</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Light/Dark</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">UI Scale</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">50-200%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Toolbars</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Customizable</span>
                </li>
              </ul>
            </GlassCard>
            
            <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-semibold mb-4">Network Settings</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm">Connection</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Advanced</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Proxy Support</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">HTTP/SOCKS</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Connection Limits</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Configurable</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Network Scanner</span>
                  <span className="text-xs bg-octaBlue-100 text-octaBlue-700 px-2 py-0.5 rounded">Pro Feature</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 text-white">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your network management?</h2>
          <p className="text-xl mb-8 text-white/80">
            Get started with OCTA-GRAM today and experience the future of network analysis and optimization.
          </p>
          <button className="bg-white text-octaBlue-700 hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-octaBlue-700">
            Start Free Trial
          </button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
