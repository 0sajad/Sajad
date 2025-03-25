
import React from "react";
import { GlassCard } from "./ui/glass-card";
import { 
  Activity, 
  Wifi, 
  Database, 
  Zap, 
  BarChart3, 
  Shield, 
  Cpu,
  Server
} from "lucide-react";

export function NetworkDashboard() {
  // Mock network stats for demonstration
  const networkStats = [
    { name: "Network Status", value: "Active", icon: Activity, color: "text-green-500" },
    { name: "Connected Devices", value: "8", icon: Wifi, color: "text-octaBlue-600" },
    { name: "Data Transfer", value: "1.2 GB", icon: Database, color: "text-purple-500" },
    { name: "Network Speed", value: "940 Mbps", icon: Zap, color: "text-amber-500" },
  ];

  return (
    <section id="dashboard" className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Network Dashboard</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time analysis and monitoring of your network performance and connected devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {networkStats.map((stat, index) => (
            <GlassCard
              key={stat.name}
              className="flex items-center p-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-3 rounded-xl mr-4 ${stat.color} bg-white shadow-sm`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2 h-[300px] animate-fade-in p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="panel-heading">Network Performance</h3>
              <p className="panel-subheading">Real-time speed and latency</p>
            </div>
            <div className="p-4 flex items-center justify-center h-[240px]">
              <div className="w-full h-full bg-gradient-to-r from-octaBlue-500/10 to-octaBlue-600/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-octaBlue-600/40" size={80} />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="h-[300px] animate-fade-in p-0 overflow-hidden" style={{ animationDelay: '100ms' }}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="panel-heading">Security Status</h3>
              <p className="panel-subheading">Network protection metrics</p>
            </div>
            <div className="p-4 flex flex-col h-[240px]">
              <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
                <Shield className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm font-medium">Firewall</p>
                  <p className="text-xs text-muted-foreground">Fully operational</p>
                </div>
              </div>
              <div className="flex items-center mb-4 p-3 bg-green-50 rounded-lg">
                <Cpu className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm font-medium">Intrusion Detection</p>
                  <p className="text-xs text-muted-foreground">Active - 0 threats</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Server className="text-green-500 mr-3" size={20} />
                <div>
                  <p className="text-sm font-medium">VPN Status</p>
                  <p className="text-xs text-muted-foreground">Connected - Secured</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
