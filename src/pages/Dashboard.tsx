
import React from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  
  return (
    <div className="container mx-auto p-6">
      <Header />
      
      {/* Show Developer Panel only in Developer Mode */}
      {isDeveloperMode && <DeveloperPanel />}
      
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground">Welcome to OCTA-GRAM Dashboard</p>
    </div>
  );
};

export default Dashboard;
