import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OverviewPage from "@/pages/overview";
import SignalsPage from "@/pages/signals";
import DatasetsPage from "@/pages/datasets";
import RecordsPage from "@/pages/records";
import MethodPage from "@/pages/method";
import AccessPage from "@/pages/access";
import LoginPage from "@/pages/login";
import OperatorPage from "@/pages/operator";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* ── Public layer ────────────────────────── */}
      <Route path="/"         component={Home} />
      <Route path="/overview" component={OverviewPage} />
      <Route path="/signals"  component={SignalsPage} />
      <Route path="/datasets" component={DatasetsPage} />
      <Route path="/records"  component={RecordsPage} />
      <Route path="/method"   component={MethodPage} />
      <Route path="/access"   component={AccessPage} />

      {/* ── Operator layer ──────────────────────── */}
      <Route path="/login"    component={LoginPage} />
      <Route path="/operator">
        {() => (
          <ProtectedRoute>
            <OperatorPage />
          </ProtectedRoute>
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
