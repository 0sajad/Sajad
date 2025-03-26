
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Shield, AlertTriangle, CheckCircle, Lock, Unlock, Key, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Generate security threats data
const generateThreatsData = () => {
  return [
    { name: "Malware", value: Math.floor(Math.random() * 20) + 5 },
    { name: "Phishing", value: Math.floor(Math.random() * 25) + 10 },
    { name: "Intrusion", value: Math.floor(Math.random() * 15) + 3 },
    { name: "Vulnerabilities", value: Math.floor(Math.random() * 12) + 8 }
  ];
};

// Generate historical threat data
const generateHistoricalData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      day,
      blocked: Math.floor(Math.random() * 30) + 20,
      critical: Math.floor(Math.random() * 5),
      warnings: Math.floor(Math.random() * 10) + 5
    };
  }).reverse();
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const SecurityDashboard = () => {
  const { t } = useTranslation();
  const [threatData, setThreatData] = useState(generateThreatsData());
  const [historicalData, setHistoricalData] = useState(generateHistoricalData());
  const [securityScore, setSecurityScore] = useState(Math.floor(Math.random() * 20) + 75);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Aggregate threat total
  const threatTotal = threatData.reduce((sum, item) => sum + item.value, 0);
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('securityDashboard.refreshing', 'Refreshing Security Data'),
      description: t('securityDashboard.analyzingThreats', 'Analyzing potential security threats...')
    });
    
    setTimeout(() => {
      setThreatData(generateThreatsData());
      setHistoricalData(generateHistoricalData());
      setSecurityScore(Math.floor(Math.random() * 20) + 75);
      setIsRefreshing(false);
    }, 2000);
  };
  
  // Get security status label and color based on score
  const getSecurityStatus = () => {
    if (securityScore >= 90) {
      return { label: t('securityDashboard.excellent', 'Excellent'), color: 'text-green-600' };
    } else if (securityScore >= 75) {
      return { label: t('securityDashboard.good', 'Good'), color: 'text-blue-600' };
    } else if (securityScore >= 60) {
      return { label: t('securityDashboard.fair', 'Fair'), color: 'text-amber-600' };
    } else {
      return { label: t('securityDashboard.poor', 'Poor'), color: 'text-red-600' };
    }
  };
  
  const securityStatus = getSecurityStatus();
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-octaBlue-800 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-octaBlue-600" />
            {t('securityDashboard.title', 'Security Dashboard')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('securityDashboard.description', 'Monitor and manage security threats to your network')}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData} 
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={cn("mr-2", isRefreshing && "animate-spin")} />
          {t('securityDashboard.refresh', 'Refresh')}
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="p-4 rounded-lg border bg-gradient-to-br from-white to-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t('securityDashboard.securityScore', 'Security Score')}</h3>
                <span className={`text-lg font-bold ${securityStatus.color}`}>{securityScore}/100 - {securityStatus.label}</span>
              </div>
              
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full rounded-full ${
                    securityScore >= 90 ? 'bg-green-500' : 
                    securityScore >= 75 ? 'bg-blue-500' : 
                    securityScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${securityScore}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">90-100: {t('securityDashboard.excellent', 'Excellent')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-muted-foreground">75-89: {t('securityDashboard.good', 'Good')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-muted-foreground">60-74: {t('securityDashboard.fair', 'Fair')}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('securityDashboard.firewallStatus', 'Firewall Status')}</p>
                      <p className="text-lg font-medium">{t('securityDashboard.active', 'Active')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Lock className="text-blue-500" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('securityDashboard.encryptionStatus', 'Encryption')}</p>
                      <p className="text-lg font-medium">WPA3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Key className="text-amber-500" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('securityDashboard.passwordStrength', 'Password Strength')}</p>
                      <p className="text-lg font-medium">{t('securityDashboard.strong', 'Strong')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <div className="p-4 rounded-lg border">
              <h3 className="text-lg font-medium mb-4">{t('securityDashboard.threatDistribution', 'Threat Distribution')}</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={threatData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {threatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <AlertCircle size={12} className="mr-1" />
                  {threatTotal} {t('securityDashboard.threatsDetected', 'threats detected')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">{t('securityDashboard.historicalThreats', 'Historical Security Activity')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="blocked" name={t('securityDashboard.blocked', 'Blocked Threats')} fill="#3b82f6" />
                <Bar dataKey="warnings" name={t('securityDashboard.warnings', 'Warnings')} fill="#f59e0b" />
                <Bar dataKey="critical" name={t('securityDashboard.critical', 'Critical')} fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-500 h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-md font-medium text-amber-800 mb-1">{t('securityDashboard.securityRecommendations', 'Security Recommendations')}</h3>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span>{t('securityDashboard.recommendation1', 'Update router firmware to latest version')}</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span>{t('securityDashboard.recommendation2', 'Enable two-factor authentication for admin access')}</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                  <span>{t('securityDashboard.recommendation3', 'Review and remove unused network devices')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" className="w-full">
              <Shield size={16} className="mr-2" />
              {t('securityDashboard.applyRecommendations', 'Apply All Recommendations')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
