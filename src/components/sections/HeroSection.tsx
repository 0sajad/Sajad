
import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, BrainCircuit } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 bg-white dark:bg-gray-900 relative">
      <div className="text-center max-w-3xl mx-auto animate-fade-in">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
          {t('hero.badge')}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
          Sajad Kadhim
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
          <Link to="/ai">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center">
              <BrainCircuit className="mr-2" size={18} />
              <span>{t('hero.aiAssistant')}</span>
            </button>
          </Link>
          <button className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors flex items-center">
            <span>{t('hero.learnMore')}</span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-fade-in" style={{ animationDelay: '1000ms' }}>
        <a 
          href="#dashboard" 
          className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 animate-float"
        >
          <ArrowDown size={20} className="text-blue-600" />
        </a>
      </div>
    </section>
  );
}
