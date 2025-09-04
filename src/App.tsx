import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Index />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/integration/*"
            element={
              <DashboardLayout>
                <div className="p-8">Integration & Configuration pages coming soon...</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/transactions/*"
            element={
              <DashboardLayout>
                <div className="p-8">Transactions pages coming soon...</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/cases/*"
            element={
              <DashboardLayout>
                <div className="p-8">Case Management pages coming soon...</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/workflows/*"
            element={
              <DashboardLayout>
                <div className="p-8">Workflow Settings pages coming soon...</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/reports/*"
            element={
              <DashboardLayout>
                <div className="p-8">Reporting pages coming soon...</div>
              </DashboardLayout>
            }
          />
          <Route
            path="/users/*"
            element={
              <DashboardLayout>
                <div className="p-8">Users & Access pages coming soon...</div>
              </DashboardLayout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
