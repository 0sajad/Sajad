
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, Search, Copy } from "lucide-react";
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { useA11y } from '@/hooks/useA11y';

interface DNSRecord {
  type: string;
  value: string;
  ttl?: number;
}

/**
 * أداة استعلام DNS - تسمح بالبحث عن معلومات DNS لنطاق معين
 */
export function DNSLookup() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [results, setResults] = useState<DNSRecord[]>([]);
  const { announce } = useA11y?.() || { announce: undefined };
  
  // وظيفة محاكاة لاستعلام DNS
  const handleLookup = async () => {
    if (!domain) {
      toast.error(t('networkTools.errors.enterDomain', 'يرجى إدخال اسم نطاق'));
      return;
    }
    
    setIsLoading(true);
    setResults([]);
    
    try {
      // محاكاة تأخير الاستعلام
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // بيانات عينة حسب نوع السجل
      switch (recordType) {
        case 'A':
          setResults([
            { type: 'A', value: '192.0.2.1', ttl: 3600 },
            { type: 'A', value: '192.0.2.2', ttl: 3600 }
          ]);
          break;
        case 'AAAA':
          setResults([
            { type: 'AAAA', value: '2001:db8::1', ttl: 3600 }
          ]);
          break;
        case 'MX':
          setResults([
            { type: 'MX', value: '10 mail.example.com', ttl: 3600 },
            { type: 'MX', value: '20 backup-mail.example.com', ttl: 3600 }
          ]);
          break;
        case 'TXT':
          setResults([
            { type: 'TXT', value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 }
          ]);
          break;
        case 'NS':
          setResults([
            { type: 'NS', value: 'ns1.example.com', ttl: 86400 },
            { type: 'NS', value: 'ns2.example.com', ttl: 86400 }
          ]);
          break;
        default:
          setResults([
            { type: recordType, value: '192.0.2.1', ttl: 3600 }
          ]);
      }
    } catch (error) {
      console.error('DNS lookup error:', error);
      toast.error(t('networkTools.errors.lookupFailed', 'فشل استعلام DNS'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // نسخ السجل إلى الحافظة
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(t('common.copied', 'تم النسخ إلى الحافظة'));
        if (announce) {
          announce(t('common.copiedToClipboard', 'تم نسخ النص إلى الحافظة'), 'polite');
        }
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
        toast.error(t('common.copyFailed', 'فشل النسخ إلى الحافظة'));
      });
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="domain-input">
            <ArabicTextEnhancer>{t('networkTools.domainName', 'اسم النطاق')}</ArabicTextEnhancer>
          </Label>
          <Input 
            id="domain-input"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="record-type">
            <ArabicTextEnhancer>{t('networkTools.recordType', 'نوع السجل')}</ArabicTextEnhancer>
          </Label>
          <Select 
            value={recordType}
            onValueChange={setRecordType}
            disabled={isLoading}
          >
            <SelectTrigger id="record-type">
              <SelectValue placeholder={t('networkTools.selectRecordType', 'اختر نوع السجل')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="AAAA">AAAA</SelectItem>
              <SelectItem value="MX">MX</SelectItem>
              <SelectItem value="CNAME">CNAME</SelectItem>
              <SelectItem value="TXT">TXT</SelectItem>
              <SelectItem value="NS">NS</SelectItem>
              <SelectItem value="SOA">SOA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleLookup} 
          disabled={isLoading || !domain}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <ArabicTextEnhancer>{t('common.loading', 'جارِ التحميل...')}</ArabicTextEnhancer>
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              <ArabicTextEnhancer>{t('networkTools.lookup', 'استعلام')}</ArabicTextEnhancer>
            </>
          )}
        </Button>
      </div>
      
      {results.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.type', 'النوع')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">
                      <ArabicTextEnhancer>{t('networkTools.value', 'القيمة')}</ArabicTextEnhancer>
                    </th>
                    <th className="p-2 text-left">TTL</th>
                    <th className="p-2 text-center">
                      <ArabicTextEnhancer>{t('common.actions', 'الإجراءات')}</ArabicTextEnhancer>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((record, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2">{record.type}</td>
                      <td className="p-2 font-mono text-xs sm:text-sm break-all">
                        {record.value}
                      </td>
                      <td className="p-2">{record.ttl}</td>
                      <td className="p-2 text-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(record.value)}
                          aria-label={t('common.copy', 'نسخ')}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
