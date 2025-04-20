import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Product, CartItem, WishlistItem } from "@shared/schema";

interface ShopContextType {
  products: Product[];
  cartItems: (CartItem & { product: Product })[];
  wishlistItems: (WishlistItem & { product: Product })[];
  categories: string[];
  searchQuery: string;
  activeCategory: string;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  isInWishlist: (productId: number) => boolean;
  getCartCount: () => number;
  getWishlistCount: () => number;
  filteredProducts: Product[];
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();

  // Fetch all products
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  // Fetch cart items
  const { data: cartItems = [], refetch: refetchCart } = useQuery({
    queryKey: ["/api/cart"],
  });

  // Fetch wishlist items
  const { data: wishlistItems = [], refetch: refetchWishlist } = useQuery({
    queryKey: ["/api/wishlist"],
  });

  // Extract unique categories from products
  const categories = products && products.length > 0
    ? ["all", ...Array.from(new Set(products.map(product => product.category)))]
    : ["all"];

  // Filter products based on search query and active category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      return await apiRequest("POST", "/api/cart", { productId });
    },
    onSuccess: () => {
      refetchCart();
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      return await apiRequest("DELETE", `/api/cart/${productId}`);
    },
    onSuccess: () => {
      refetchCart();
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    },
  });

  // Update cart quantity mutation
  const updateCartQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      return await apiRequest("PATCH", `/api/cart/${productId}`, { quantity });
    },
    onSuccess: () => {
      refetchCart();
    },
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      return await apiRequest("POST", "/api/wishlist", { productId });
    },
    onSuccess: () => {
      refetchWishlist();
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });
    },
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      return await apiRequest("DELETE", `/api/wishlist/${productId}`);
    },
    onSuccess: () => {
      refetchWishlist();
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    },
  });

  // Helper functions
  const addToCart = (productId: number) => {
    addToCartMutation.mutate(productId);
  };

  const removeFromCart = (productId: number) => {
    removeFromCartMutation.mutate(productId);
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantityMutation.mutate({ productId, quantity });
    }
  };

  const addToWishlist = (productId: number) => {
    addToWishlistMutation.mutate(productId);
  };

  const removeFromWishlist = (productId: number) => {
    removeFromWishlistMutation.mutate(productId);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.productId === productId);
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        wishlistItems,
        categories,
        searchQuery,
        activeCategory,
        setSearchQuery,
        setActiveCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
        getCartCount,
        getWishlistCount,
        filteredProducts,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
