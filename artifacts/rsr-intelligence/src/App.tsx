import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import OverviewPage from "@/pages/overview";
import SignalsPage from "@/pages/signals";
import DatasetsPage from "@/pages/datasets";
import RecordsPage from "@/pages/records";
import MethodPage from "@/pages/method";
import AccessPage from "@/pages/access";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/overview" component={OverviewPage} />
      <Route path="/signals" component={SignalsPage} />
      <Route path="/datasets" component={DatasetsPage} />
      <Route path="/records" component={RecordsPage} />
      <Route path="/method" component={MethodPage} />
      <Route path="/access" component={AccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
