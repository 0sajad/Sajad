
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Automatically redirect to the dashboard after 3 seconds
    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(redirectTimeout);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">{t("notFound.message", "Oops! Page not found")}</p>
        <a 
          href="/" 
          className="text-blue-500 hover:text-blue-700 underline"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          {t("notFound.returnHome", "Return to Dashboard")}
        </a>
        <p className="mt-4 text-sm text-gray-500">
          {t("notFound.redirecting", "Redirecting to dashboard in 3 seconds...")}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
