
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">{t('error.pageNotFound')}</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        {t('error.pageNotFoundDescription')}
      </p>
      <div className="flex gap-4">
        <Button 
          variant="default" 
          onClick={() => navigate('/')}
        >
          {t('error.goToHome')}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
        >
          {t('error.goBack')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
