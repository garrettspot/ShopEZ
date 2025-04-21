import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Footer from "@/components/Footer";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ShopProvider } from "./context/ShopContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App({base='/'
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Router />
            </div>
            <Footer />
            <Toaster />
          </div>
        </TooltipProvider>
      </ShopProvider>
    </QueryClientProvider>
  );
}

export default App;