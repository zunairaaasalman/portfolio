import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import ViewItemsPage from "@/pages/ViewItemsPage";
import AddItemPage from "@/pages/AddItemPage";
import EditItemPage from "@/pages/EditItemPage";
import ItemDetailsPage from "@/pages/ItemDetailsPage";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

function Router() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/items" component={ViewItemsPage} />
        <Route path="/items/:id" component={ItemDetailsPage} />
        <Route path="/add-item" component={AddItemPage} />
        <Route path="/edit-item/:id" component={EditItemPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
