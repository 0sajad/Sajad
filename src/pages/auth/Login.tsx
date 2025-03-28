
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{t('common.login')}</CardTitle>
          <CardDescription>{t('common.loginDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('common.email')}</Label>
            <Input id="email" type="email" placeholder="example@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('common.password')}</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                {t('common.forgotPassword')}
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">{t('common.login')}</Button>
          <div className="text-center text-sm">
            {t('common.noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('common.register')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
