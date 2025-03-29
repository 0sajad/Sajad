
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckIcon, XIcon, SearchIcon, InfoIcon } from 'lucide-react';

export function TranslationManager() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("missing");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
  const [metrics, setMetrics] = useState<any>({
    totalLookups: 0,
    keysByLanguage: {},
    uniqueKeysCount: 0,
    missingKeys: [],
    missingKeysCount: 0,
    lastUsedKey: null,
    topUsedKeys: []
  });
  
  // Mock translation metrics
  useEffect(() => {
    // In a real app, this would come from a translation metrics service
    const mockMissingKeys = [
      'dashboard.devices.title',
      'dashboard.network.trafficTitle',
      'settings.connectivity.cloud',
      'errors.connection.timeout',
      'common.status.pending'
    ];
    
    const mockTopKeys = [
      { key: 'common.cancel', count: 24 },
      { key: 'common.save', count: 18 },
      { key: 'common.edit', count: 15 },
      { key: 'common.delete', count: 12 },
      { key: 'common.add', count: 10 }
    ];
    
    setMetrics({
      totalLookups: 387,
      keysByLanguage: {
        en: new Set(['common.save', 'common.cancel']),
        ar: new Set(['common.yes', 'common.no'])
      },
      uniqueKeysCount: 124,
      missingKeys: mockMissingKeys,
      missingKeysCount: mockMissingKeys.length,
      lastUsedKey: 'settings.theme.dark',
      topUsedKeys: mockTopKeys
    });
  }, []);
  
  // Filter missing keys based on search query
  const filteredMissingKeys = Array.isArray(metrics.missingKeys) 
    ? metrics.missingKeys.filter((key: string) => 
        key.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  
  // Handle language change
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };
  
  // Get badge variant based on usage count
  const getBadgeVariantByCount = (count: number) => {
    if (count > 20) return "default";
    if (count > 10) return "secondary";
    return "outline";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            {t('dev.translations.title', 'Translation Metrics')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('dev.translations.description', 'Analyze and manage translation keys')}
          </p>
        </div>
        
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربية</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dev.translations.totalLookups', 'Total Lookups')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalLookups}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dev.translations.uniqueKeys', 'Unique Keys')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uniqueKeysCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dev.translations.missingKeys', 'Missing Keys')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{metrics.missingKeysCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dev.translations.lastUsed', 'Last Used')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium truncate">{metrics.lastUsedKey}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="missing">
            {t('dev.translations.missingTab', 'Missing Keys')}
          </TabsTrigger>
          <TabsTrigger value="popular">
            {t('dev.translations.popularTab', 'Most Used')}
          </TabsTrigger>
          <TabsTrigger value="all">
            {t('dev.translations.allTab', 'All Keys')}
          </TabsTrigger>
        </TabsList>
        
        {/* Missing Keys Tab */}
        <TabsContent value="missing">
          <div className="mb-4 flex gap-2">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('dev.translations.searchKeys', 'Search missing keys...')}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              {t('dev.translations.addAll', 'Add All')}
            </Button>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('dev.translations.key', 'Key')}</TableHead>
                  <TableHead>{t('dev.translations.namespace', 'Namespace')}</TableHead>
                  <TableHead>{t('dev.translations.status', 'Status')}</TableHead>
                  <TableHead className="text-right">{t('dev.translations.actions', 'Actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMissingKeys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      {searchQuery ? t('dev.translations.noResults', 'No results found') : t('dev.translations.noMissingKeys', 'No missing keys')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMissingKeys.map((key: string) => {
                    // Split key by dot to get namespace
                    const parts = key.split('.');
                    const namespace = parts[0];
                    
                    return (
                      <TableRow key={key}>
                        <TableCell className="font-mono text-xs">{key}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{namespace}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <XIcon className="h-3 w-3" />
                            {t('dev.translations.missing', 'Missing')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            {t('dev.translations.add', 'Add')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Most Used Tab */}
        <TabsContent value="popular">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('dev.translations.key', 'Key')}</TableHead>
                  <TableHead>{t('dev.translations.usageCount', 'Usage Count')}</TableHead>
                  <TableHead>{t('dev.translations.hasTranslation', 'Has Translation')}</TableHead>
                  <TableHead className="text-right">{t('dev.translations.actions', 'Actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.topUsedKeys.map((item: { key: string; count: number }) => {
                  // Check if key has translation in current language
                  const hasTranslation = Math.random() > 0.3; // Mock check
                  
                  return (
                    <TableRow key={item.key}>
                      <TableCell className="font-mono text-xs">{item.key}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariantByCount(item.count as number)}>
                          {item.count}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {hasTranslation ? (
                          <Badge variant="success" className="bg-green-100 text-green-800 flex items-center gap-1">
                            <CheckIcon className="h-3 w-3" />
                            {t('dev.translations.translated', 'Translated')}
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="bg-amber-100 text-amber-800 flex items-center gap-1">
                            <InfoIcon className="h-3 w-3" />
                            {t('dev.translations.needsReview', 'Needs Review')}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          {t('dev.translations.edit', 'Edit')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* All Keys Tab */}
        <TabsContent value="all">
          <div className="p-4 text-center text-muted-foreground">
            <p>{t('dev.translations.allKeysDescription', 'This section will show all translation keys when implemented.')}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
