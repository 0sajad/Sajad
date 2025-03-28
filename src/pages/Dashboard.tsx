
import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NetworkDashboard } from "@/components/NetworkDashboard";

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('header.dashboard')}</h1>
        <NetworkDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
