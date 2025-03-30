
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Check, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TranslationManagerProps {
  namespacesFilter?: string[];
}

export function TranslationManager({ namespacesFilter }: TranslationManagerProps) {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedNamespace, setSelectedNamespace] = useState('');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [filteredKeys, setFilteredKeys] = useState<string[]>([]);
  
  // Load translations
  useEffect(() => {
    // This is a mock implementation
    const mockTranslations = {
      'common.save': { en: 'Save', ar: 'حفظ', fr: 'Enregistrer' },
      'common.cancel': { en: 'Cancel', ar: 'إلغاء', fr: 'Annuler' },
      'common.edit': { en: 'Edit', ar: 'تعديل', fr: 'Éditer' },
      'common.delete': { en: 'Delete', ar: 'حذف', fr: '' }, // Missing in French
      'dashboard.title': { en: 'Dashboard', ar: 'لوحة القيادة', fr: 'Tableau de bord' },
      'dashboard.summary': { en: 'Summary', ar: 'ملخص', fr: '' }, // Missing in French
      'settings.appearance': { en: 'Appearance', ar: 'المظهر', fr: 'Apparence' },
      'settings.network': { en: 'Network', ar: 'الشبكة', fr: 'Réseau' },
      'settings.security': { en: 'Security', ar: '', fr: 'Sécurité' }, // Missing in Arabic
      'tools.scanner': { en: 'Network Scanner', ar: 'ماسح الشبكة', fr: 'Scanner réseau' },
    };
    
    setTranslations(mockTranslations);
    
    // Extract unique namespaces from keys
    const uniqueNamespaces = Array.from(
      new Set(Object.keys(mockTranslations).map(key => key.split('.')[0]))
    );
    setNamespaces(uniqueNamespaces);
    
  }, []);
  
  // Filter translations based on search, status, and namespace
  useEffect(() => {
    // Create a mutable copy of the keys array
    let keys = [...Object.keys(translations)];
    
    // Apply namespace filter if selected
    if (selectedNamespace) {
      keys = keys.filter(key => key.startsWith(`${selectedNamespace}.`));
    }
    
    // Apply status filter
    if (selectedStatus === 'missing') {
      keys = keys.filter(key => {
        const translationObj = translations[key];
        return Object.values(translationObj).some(val => val === '');
      });
    } else if (selectedStatus === 'complete') {
      keys = keys.filter(key => {
        const translationObj = translations[key];
        return Object.values(translationObj).every(val => val !== '');
      });
    }
    
    // Apply search filter
    if (searchTerm) {
      keys = keys.filter(key => 
        key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(translations[key]).some(
          val => typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    setFilteredKeys(keys);
  }, [translations, searchTerm, selectedStatus, selectedNamespace]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {t('i18n.translationManager', 'Translation Manager')}
          </span>
          <Badge variant="outline">
            {i18n.language.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('i18n.searchTranslations', 'Search translations...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('i18n.status', 'Status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('i18n.allTranslations', 'All')}</SelectItem>
                <SelectItem value="missing">{t('i18n.missingTranslations', 'Missing')}</SelectItem>
                <SelectItem value="complete">{t('i18n.completeTranslations', 'Complete')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedNamespace} onValueChange={setSelectedNamespace}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('i18n.namespace', 'Namespace')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('i18n.allNamespaces', 'All Namespaces')}</SelectItem>
                {namespaces.map(namespace => (
                  <SelectItem key={namespace} value={namespace}>{namespace}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Translations Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('i18n.key', 'Key')}</TableHead>
                <TableHead>{t('i18n.translations', 'Translations')}</TableHead>
                <TableHead className="text-right">{t('i18n.status', 'Status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    {searchTerm 
                      ? t('i18n.noMatchingTranslations', 'No matching translations found') 
                      : t('i18n.noTranslations', 'No translations available')
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredKeys.map(key => {
                  const translationObj = translations[key];
                  const isComplete = Object.values(translationObj).every(val => val !== '');
                  
                  return (
                    <TableRow key={key} className="group">
                      <TableCell className="font-mono text-xs">
                        {key}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {Object.entries(translationObj).map(([lang, value]) => (
                            <div key={lang} className="flex items-center gap-1">
                              <Badge variant="outline" className="w-8 text-center">
                                {lang}
                              </Badge>
                              <span className={`text-sm ${value ? '' : 'text-red-500 italic'}`}>
                                {value || t('i18n.missing', 'Missing')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {isComplete ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            {t('i18n.complete', 'Complete')}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-500 border-amber-200">
                            <X className="h-3 w-3 mr-1" />
                            {t('i18n.incomplete', 'Incomplete')}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between mt-4">
          <span className="text-sm text-muted-foreground">
            {t('i18n.showing', {
              count: filteredKeys.length,
              total: Object.keys(translations).length,
              defaultValue: `Showing ${filteredKeys.length} of ${Object.keys(translations).length} keys`
            })}
          </span>
          
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            {t('i18n.addTranslation', 'Add Translation')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
