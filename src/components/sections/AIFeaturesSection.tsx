
import React from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  BrainCircuit, 
  ArrowRight,
  Code,
  FileCode,
  Cpu
} from "lucide-react";

export function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced artificial intelligence to predict, optimize, and secure your network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="p-8 animate-fade-in md:col-span-2">
            <div className="p-4 rounded-xl bg-purple-50 inline-block mb-6">
              <BrainCircuit size={28} className="text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Self-Improving AI System</h3>
            <p className="text-muted-foreground mb-6">
              Our AI continuously analyzes network patterns, learns from them, and improves itself automatically to provide the best network management experience.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-green-50 mt-1 mr-3">
                  <Code size={16} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Multi-language Support</h4>
                  <p className="text-xs text-muted-foreground">Supports all programming languages</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-blue-50 mt-1 mr-3">
                  <FileCode size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">File Handling</h4>
                  <p className="text-xs text-muted-foreground">Processes all types of files and media</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-amber-50 mt-1 mr-3">
                  <Cpu size={16} className="text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Autonomous Development</h4>
                  <p className="text-xs text-muted-foreground">Develops new tools without intervention</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-purple-50 mt-1 mr-3">
                  <BrainCircuit size={16} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Advanced Learning</h4>
                  <p className="text-xs text-muted-foreground">Continuous learning from interactions</p>
                </div>
              </div>
            </div>
            
            <Link to="/ai" className="inline-flex items-center text-octaBlue-600 hover:text-octaBlue-700 font-medium transition-colors">
              <span>Explore AI Assistant</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </GlassCard>
          
          <GlassCard className="p-0 overflow-hidden animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="panel-heading">AI Assistant Preview</h3>
            </div>
            <div className="p-4">
              <AIAssistant />
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
