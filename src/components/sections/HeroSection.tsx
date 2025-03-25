
import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, BrainCircuit } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="absolute -z-10 top-0 left-0 right-0 h-screen bg-gradient-to-b from-white via-white/80 to-transparent" />
      
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-octaBlue-50 text-octaBlue-600 text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-octaBlue-600 mr-2 animate-pulse"></span>
          {t('hero.badge')}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Sajad Kadhim
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
          <Link to="/ai">
            <button className="action-button flex items-center">
              <BrainCircuit className="mr-2" size={18} />
              <span>{t('hero.aiAssistant')}</span>
            </button>
          </Link>
          <button className="secondary-button flex items-center">
            <span>{t('hero.learnMore')}</span>
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
  );
}
