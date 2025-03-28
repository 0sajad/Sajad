
import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from 'react-i18next';

export function SettingsSection() {
  const { t } = useTranslation();
  
  return (
    <section id="settings" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('settings.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('settings.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">{t('settings.generalSettings')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.displayOptions')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.supported')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.animations')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.customizable')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.updates')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.automatic')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.languageRegion')}</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{t('settings.languages')}</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-semibold mb-4">{t('settings.uiSettings')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.elementDensity')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.adjustable')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.theme')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.lightDark')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.uiScale')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.scale')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.toolbars')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.customizable')}</span>
              </li>
            </ul>
          </GlassCard>
          
          <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-semibold mb-4">{t('settings.networkSettings')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.connection')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.advanced')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.proxySupport')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.httpSocks')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.connectionLimits')}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{t('settings.configurable')}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm">{t('settings.networkScanner')}</span>
                <span className="text-xs bg-octaBlue-100 text-octaBlue-700 px-2 py-0.5 rounded">{t('settings.proFeature')}</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

// Add default export for compatibility with React.lazy()
export default SettingsSection;
