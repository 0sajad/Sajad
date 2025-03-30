
import React, { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import SuspenseLoader from "./components/SuspenseLoader";
import Dashboard from "./pages/Dashboard";
import { ErrorBoundary } from "./components/ui/error/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { ModeProvider } from "./context/ModeContext";
import { RTLWrapper } from "./components/layout/RTLWrapper";
import { LiveAnnouncer } from "./components/ui/accessibility/LiveAnnouncer";

// Lazy load components for better performance
const NetworkScanner = lazy(() => import("./pages/NetworkScanner"));
const AIAssistant = lazy(() => import("./pages/AIAssistant"));
const Simulation = lazy(() => import("./pages/Simulation"));
const License = lazy(() => import("./pages/License"));
const Settings = lazy(() => import("./pages/Settings"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Tools = lazy(() => import("./pages/Tools"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App: React.FC = () => {
  const { t } = useTranslation();
  
  // Memoize the routes to prevent unnecessary re-renders
  const appRoutes = useMemo(() => (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fiber-optic" element={<NetworkScanner />} />
      <Route path="/ai" element={<AIAssistant />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/license" element={<License />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help-center" element={<HelpCenter />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  ), []);
  
  return (
    <ModeProvider>
      <Router>
        <RTLWrapper>
          <Layout>
            <LiveAnnouncer />
            <ErrorBoundary>
              <Suspense fallback={<SuspenseLoader />}>
                {appRoutes}
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </RTLWrapper>
      </Router>
    </ModeProvider>
  );
};

export default App;
