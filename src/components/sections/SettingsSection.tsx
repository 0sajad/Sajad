
import React from "react";
import { GlassCard } from "@/components/ui/glass-card";

export function SettingsSection() {
  return (
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
  );
}
