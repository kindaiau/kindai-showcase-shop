import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Toolkit from "./pages/Toolkit";
import Demo from "./pages/Demo";
import GuidedDemo from "./pages/GuidedDemo";
import Assessment from "./pages/Assessment";
import Purchase from "./pages/Purchase";
import PurchaseRedirect from "./pages/PurchaseRedirect";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import Welcome from "./pages/Welcome";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/demo/guided" element={<GuidedDemo />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/purchase/redirect" element={<PurchaseRedirect />} />
            <Route path="/purchase/success" element={<PurchaseSuccess />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
