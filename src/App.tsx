import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Page imports
import ApiKeysPage from "./pages/integration/ApiKeysPage";
import EndpointsPage from "./pages/integration/EndpointsPage";
import EnvironmentsPage from "./pages/integration/EnvironmentsPage";
import TransactionsOverview from "./pages/transactions/TransactionsOverview";
import CaseManagement from "./pages/cases/CaseManagement";
import WorkflowSettings from "./pages/workflows/WorkflowSettings";
import ReportsDashboard from "./pages/reports/ReportsDashboard";
import UsersAccess from "./pages/users/UsersAccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          {/* Integration Routes */}
          <Route path="/integration" element={<DashboardLayout><ApiKeysPage /></DashboardLayout>} />
          <Route path="/integration/api-keys" element={<DashboardLayout><ApiKeysPage /></DashboardLayout>} />
          <Route path="/integration/endpoints" element={<DashboardLayout><EndpointsPage /></DashboardLayout>} />
          <Route path="/integration/environments" element={<DashboardLayout><EnvironmentsPage /></DashboardLayout>} />

          {/* Transaction Routes */}
          <Route path="/transactions" element={<DashboardLayout><TransactionsOverview /></DashboardLayout>} />
          <Route path="/transactions/feed" element={<DashboardLayout><div className="p-8">Real-time Feed coming soon...</div></DashboardLayout>} />
          <Route path="/transactions/failed" element={<DashboardLayout><div className="p-8">Failed Transactions coming soon...</div></DashboardLayout>} />

          {/* Case Management Routes */}
          <Route path="/cases" element={<DashboardLayout><CaseManagement /></DashboardLayout>} />
          <Route path="/cases/review" element={<DashboardLayout><CaseManagement /></DashboardLayout>} />
          <Route path="/cases/escalation" element={<DashboardLayout><div className="p-8">Escalation Rules coming soon...</div></DashboardLayout>} />
          <Route path="/cases/details" element={<DashboardLayout><div className="p-8">Transaction Details coming soon...</div></DashboardLayout>} />

          {/* Workflow Routes */}
          <Route path="/workflows" element={<DashboardLayout><WorkflowSettings /></DashboardLayout>} />
          <Route path="/workflows/risk-scoring" element={<DashboardLayout><WorkflowSettings /></DashboardLayout>} />
          <Route path="/workflows/rules" element={<DashboardLayout><div className="p-8">Rule Sets coming soon...</div></DashboardLayout>} />
          <Route path="/workflows/features" element={<DashboardLayout><div className="p-8">Feature Toggles coming soon...</div></DashboardLayout>} />

          {/* Reports Routes */}
          <Route path="/reports" element={<DashboardLayout><ReportsDashboard /></DashboardLayout>} />
          <Route path="/reports/kpi" element={<DashboardLayout><ReportsDashboard /></DashboardLayout>} />
          <Route path="/reports/custom" element={<DashboardLayout><div className="p-8">Custom Reports coming soon...</div></DashboardLayout>} />
          <Route path="/reports/export" element={<DashboardLayout><div className="p-8">Export Center coming soon...</div></DashboardLayout>} />

          {/* Users Routes */}
          <Route path="/users" element={<DashboardLayout><UsersAccess /></DashboardLayout>} />
          <Route path="/users/roles" element={<DashboardLayout><UsersAccess /></DashboardLayout>} />
          <Route path="/users/sso" element={<DashboardLayout><UsersAccess /></DashboardLayout>} />
          <Route path="/users/audit" element={<DashboardLayout><UsersAccess /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
