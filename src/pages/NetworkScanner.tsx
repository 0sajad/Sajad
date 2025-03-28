
import React from "react";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";

const NetworkScanner = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto p-6 pb-20">
      <Header />
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4 font-tajawal">{t('networkTools.title')}</h1>
        <p className="text-muted-foreground">{t('networkTools.description')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Network scanner content would go here */}
        <div className="p-6 border rounded-lg shadow-sm bg-card">
          <h3 className="text-xl font-medium mb-2">{t('networkTools.networkScanner')}</h3>
          <p className="text-sm text-muted-foreground mb-4">{t('networkTools.scannerDescription')}</p>
        </div>
      </div>
    </div>
  );
};

export default NetworkScanner;
