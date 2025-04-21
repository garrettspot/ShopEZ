import { Link, useLocation } from "wouter";
import { useShop } from "@/context/ShopContext";
import { Input } from "@/components/ui/input";
import { Home, Heart, ShoppingCart, Search } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { searchQuery, setSearchQuery, getCartCount, getWishlistCount } = useShop();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/ShopEZ">
              <div className="text-2xl font-bold text-primary cursor-pointer">ShopEZ</div>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products"
                className="w-full py-2 px-4 rounded-lg"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link href="/">
              <div className={`flex items-center text-gray-700 hover:text-primary transition-colors cursor-pointer ${location === "/" ? "text-primary" : ""}`}>
                <Home className="mr-1 h-4 w-4" />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/wishlist">
              <div className={`flex items-center text-gray-700 hover:text-primary transition-colors relative cursor-pointer ${location === "/wishlist" ? "text-primary" : ""}`}>
                <Heart className="mr-1 h-4 w-4" />
                <span>Wishlist</span>
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#F97316] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getWishlistCount()}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/cart">
              <div className={`flex items-center text-gray-700 hover:text-primary transition-colors relative cursor-pointer ${location === "/cart" ? "text-primary" : ""}`}>
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>Cart</span>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#F97316] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}