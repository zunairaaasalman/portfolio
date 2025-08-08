import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layouts/Navbar";
import HomePage from "@/pages/HomePage";
import ViewItemsPage from "@/pages/ViewItemsPage";
import AddItemPage from "@/pages/AddItemPage";
import EditItemPage from "@/pages/EditItemPage";
import ItemDetailsPage from "@/pages/ItemDetailsPage";
import NotFoundPage from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/items" component={ViewItemsPage} />
            <Route path="/add-item" component={AddItemPage} />
            <Route path="/edit-item/:id" component={EditItemPage} />
            <Route path="/items/:id" component={ItemDetailsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;