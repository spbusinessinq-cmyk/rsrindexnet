import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SystemsPage from "@/pages/systems";
import SignalsPage from "@/pages/signals";
import ToolsPage from "@/pages/tools";
import FilesPage from "@/pages/files";
import BriefsPage from "@/pages/briefs";
import NetworkPage from "@/pages/network";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/systems" component={SystemsPage} />
      <Route path="/signals" component={SignalsPage} />
      <Route path="/tools" component={ToolsPage} />
      <Route path="/files" component={FilesPage} />
      <Route path="/briefs" component={BriefsPage} />
      <Route path="/network" component={NetworkPage} />
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
