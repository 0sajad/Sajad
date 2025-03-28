
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export function CTASection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 text-white">
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
        <p className="text-xl mb-8 text-white/80">
          {t('cta.description')}
        </p>
        <button 
          onClick={() => navigate('/ai')}
          className="bg-white text-octaBlue-700 hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-octaBlue-700"
        >
          {t('cta.startFreeTrial')}
        </button>
      </div>
    </section>
  );
}

// Add default export for compatibility with React.lazy()
export default CTASection;
