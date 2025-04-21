import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app) {
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });

  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems();
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const { productId } = req.body;
      
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      
      const product = await storage.getProductById(Number(productId));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const existingCartItem = await storage.getCartItemByProductId(Number(productId));
      
      if (existingCartItem) {
        const updatedItem = await storage.updateCartItemQuantity(
          existingCartItem.id,
          existingCartItem.quantity + 1
        );
        return res.json(updatedItem);
      }
      
      const cartItem = await storage.addToCart({
        userId: 1, 
        productId: Number(productId),
        quantity: 1
      });
      
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding item to cart" });
    }
  });

  app.patch("/api/cart/:productId", async (req, res) => {
    try {
      const productId = Number(req.params.productId);
      const { quantity } = req.body;
      
      if (quantity === undefined || quantity < 1) {
        return res.status(400).json({ message: "Valid quantity is required" });
      }
      
      const cartItem = await storage.getCartItemByProductId(productId);
      
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(cartItem.id, quantity);
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item" });
    }
  });

  app.delete("/api/cart/:productId", async (req, res) => {
    try {
      const productId = Number(req.params.productId);
      const cartItem = await storage.getCartItemByProductId(productId);
      
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      await storage.removeFromCart(cartItem.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart" });
    }
  });

  app.get("/api/wishlist", async (req, res) => {
    try {
      const wishlistItems = await storage.getWishlistItems();
      res.json(wishlistItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching wishlist items" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const { productId } = req.body;
      
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }
      
      const product = await storage.getProductById(Number(productId));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const existingItem = await storage.getWishlistItemByProductId(Number(productId));
      
      if (existingItem) {
        return res.json(existingItem);
      }
      
      const wishlistItem = await storage.addToWishlist({
        userId: 1, 
        productId: Number(productId)
      });
      
      res.status(201).json(wishlistItem);
    } catch (error) {
      res.status(500).json({ message: "Error adding item to wishlist" });
    }
  });

  app.delete("/api/wishlist/:productId", async (req, res) => {
    try {
      const productId = Number(req.params.productId);
      const wishlistItem = await storage.getWishlistItemByProductId(productId);
      
      if (!wishlistItem) {
        return res.status(404).json({ message: "Wishlist item not found" });
      }
      
      await storage.removeFromWishlist(wishlistItem.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error removing item from wishlist" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}