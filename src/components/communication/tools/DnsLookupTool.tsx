
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function DnsLookupTool() {
  const { t } = useTranslation("communicationTools");
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [isSearching, setIsSearching] = useState(false);

  const search = () => {
    if (!domain) return;
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.dnsLookup.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.dnsLookup.description")}</p>
                <p className="mt-2 text-xs">{t("tools.dnsLookup.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.dnsLookup.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t("tools.dnsLookup.domainPlaceholder")}
              disabled={isSearching}
            />
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              {t("tools.dnsLookup.recordType")}
            </label>
            <Select value={recordType} onValueChange={setRecordType} disabled={isSearching}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">{t("tools.dnsLookup.recordTypes.A")}</SelectItem>
                <SelectItem value="AAAA">{t("tools.dnsLookup.recordTypes.AAAA")}</SelectItem>
                <SelectItem value="CNAME">{t("tools.dnsLookup.recordTypes.CNAME")}</SelectItem>
                <SelectItem value="MX">{t("tools.dnsLookup.recordTypes.MX")}</SelectItem>
                <SelectItem value="TXT">{t("tools.dnsLookup.recordTypes.TXT")}</SelectItem>
                <SelectItem value="NS">{t("tools.dnsLookup.recordTypes.NS")}</SelectItem>
                <SelectItem value="ALL">{t("tools.dnsLookup.recordTypes.ALL")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={search} disabled={!domain || isSearching} className="w-full">
            {isSearching ? t("searching", "Searching...") : t("tools.dnsLookup.search")}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.dnsLookup.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
