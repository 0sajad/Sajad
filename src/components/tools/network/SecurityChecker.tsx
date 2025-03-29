import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { CheckCircle, AlertTriangle, ShieldAlert, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SecurityCheckResult {
  status: "pending" | "complete";
  severity: "secure" | "warning" | "vulnerable";
  details: string;
}

const initialSecurityCheckResult: SecurityCheckResult = {
  status: "pending",
  severity: "secure",
  details: "Starting security check...",
};

// دالة تحويل تصنيف الأمان إلى variant زر مدعوم
const getSecurityVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
  switch (status) {
    case "secure":
      return "default"; // استخدام default مع تخصيص اللون الأخضر
    case "warning":
      return "secondary"; // استخدام secondary بدلاً من warning
    case "vulnerable":
      return "destructive";
    default:
      return "outline";
  }
};

function getSecurityStatusText(severity: string): string {
  switch (severity) {
    case "secure":
      return "آمن";
    case "warning":
      return "تحذير";
    case "vulnerable":
      return "خطر";
    default:
      return "غير معروف";
  }
}

export function SecurityChecker() {
  const { t } = useTranslation();
  const [result, setResult] = useState<SecurityCheckResult>(initialSecurityCheckResult);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a security check
    const securityCheck = async () => {
      setProgress(30);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setProgress(60);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate different security severities
      const severities = ["secure", "warning", "vulnerable"];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

      setResult({
        status: "complete",
        severity: randomSeverity,
        details: `Security check ${randomSeverity}.`,
      });

      setProgress(100);
    };

    securityCheck();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("securityChecker.title", "فحص الأمان")}</CardTitle>
        <CardDescription>
          {t("securityChecker.description", "تحقق من وجود ثغرات أمنية.")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {result.status === "pending" ? (
          <>
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto" />
              <p>{t("securityChecker.checking", "جاري الفحص...")}</p>
            </div>
            <Progress value={progress} />
          </>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {result.severity === "secure" && (
                <CheckCircle className="text-green-500 h-5 w-5" />
              )}
              {result.severity === "warning" && (
                <AlertTriangle className="text-yellow-500 h-5 w-5" />
              )}
              {result.severity === "vulnerable" && (
                <ShieldAlert className="text-red-500 h-5 w-5" />
              )}
              <p>
                {t("securityChecker.status", "الحالة")}:{" "}
                {t(`securityChecker.${result.severity}`, getSecurityStatusText(result.severity))}
              </p>
            </div>
            <p>{t("securityChecker.details", "التفاصيل")}: {result.details}</p>
            <Button
              size="sm"
              variant={getSecurityVariant(result.severity)}
              className={`min-w-24 ${
                result.severity === "secure" ? "bg-green-500 hover:bg-green-600" : ""
              }`}
            >
              {getSecurityStatusText(result.severity)}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
