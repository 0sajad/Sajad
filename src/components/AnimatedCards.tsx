
import React from "react";
import { GlassCard } from "./ui/glass-card";
import { 
  Cpu,
  Network,
  Zap, 
  Search,
  BarChart3,
  Radio,
  ExternalLink,
  BrainCircuit
} from "lucide-react";

export function AnimatedCards() {
  const features = [
    {
      title: "Network Scanner",
      description: "Discover devices, identify types, and analyze security vulnerabilities.",
      icon: Search,
      color: "from-blue-400 to-blue-600",
      delay: 0,
    },
    {
      title: "WiFi Analyzer",
      description: "Measure signal strength, analyze channel interference, and optimize performance.",
      icon: Radio,
      color: "from-purple-400 to-purple-600",
      delay: 100,
    },
    {
      title: "Traffic Analyzer",
      description: "Monitor bandwidth usage, classify traffic, and identify bandwidth-hungry applications.",
      icon: BarChart3,
      color: "from-green-400 to-green-600",
      delay: 200,
    },
    {
      title: "Packet Analyzer",
      description: "Capture packets in real-time, analyze protocols, and detect security threats.",
      icon: Network,
      color: "from-red-400 to-red-600",
      delay: 300,
    },
    {
      title: "AI Network Analysis",
      description: "Identify abnormal usage patterns, predict failures, and automate network adjustments.",
      icon: BrainCircuit,
      color: "from-amber-400 to-amber-600",
      delay: 400,
    },
    {
      title: "Fiber Optic Monitor",
      description: "Measure optical power levels, detect signal loss, and diagnose fiber issues.",
      icon: ExternalLink,
      color: "from-teal-400 to-teal-600",
      delay: 500,
    },
  ];

  return (
    <section id="tools" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Network Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional-grade tools for network monitoring, analysis, and optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              className="flex flex-col items-start animate-fade-in overflow-hidden group"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className={`w-full h-1 bg-gradient-to-r ${feature.color} transform origin-left transition-all duration-300 group-hover:h-2`} />
              <div className="p-6">
                <div className={`p-3 rounded-xl mb-4 bg-gradient-to-br ${feature.color} text-white`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
