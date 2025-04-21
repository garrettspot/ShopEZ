import { createContext, useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ShopContext = createContext(undefined);

export const ShopProvider = ({ children }) => {
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
    mutationFn: async (productId) => {
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
    mutationFn: async (productId) => {
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
    mutationFn: async ({ productId, quantity }) => {
      return await apiRequest("PATCH", `/api/cart/${productId}`, { quantity });
    },
    onSuccess: () => {
      refetchCart();
    },
  });

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: async (productId) => {
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
    mutationFn: async (productId) => {
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
  const addToCart = (productId) => {
    addToCartMutation.mutate(productId);
  };

  const removeFromCart = (productId) => {
    removeFromCartMutation.mutate(productId);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantityMutation.mutate({ productId, quantity });
    }
  };

  const addToWishlist = (productId) => {
    addToWishlistMutation.mutate(productId);
  };

  const removeFromWishlist = (productId) => {
    removeFromWishlistMutation.mutate(productId);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };

  const isInWishlist = (productId) => {
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