
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { NetworkOverview } from '@/components/dashboard/NetworkOverview';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('dashboard.title', 'لوحة التحكم')}</h1>
          <p className="text-muted-foreground">
            {t('dashboard.subtitle', 'مرحباً بك في Octa Network Haven')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <DashboardStats />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NetworkOverview />
          <RecentActivity />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
