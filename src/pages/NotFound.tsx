
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="text-center p-8 rounded-xl border bg-card shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          {t('errors.pageNotFound', 'Oops! Page not found')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/" className={`${isRTL ? 'flex-row-reverse' : ''}`}>
              <ArrowLeft className="h-4 w-4" />
              {t('errors.returnHome', 'Return to Home')}
            </Link>
          </Button>
          <Button asChild variant="default" className="flex items-center gap-2">
            <Link to="/dashboard" className={`${isRTL ? 'flex-row-reverse' : ''}`}>
              <Home className="h-4 w-4" />
              {t('errors.goToDashboard', 'Go to Dashboard')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
