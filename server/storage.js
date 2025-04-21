import { mockProducts } from "./mockData";

// Class implementing in-memory storage
export class MemStorage {
  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.wishlistItems = new Map();
    this.currentUserId = 1;
    this.currentCartItemId = 1;
    this.currentWishlistItemId = 1;
    
    // Initialize with mock products
    this.initializeMockData();
  }

  initializeMockData() {
    mockProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User operations
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getAllProducts() {
    return Array.from(this.products.values());
  }

  async getProductById(id) {
    return this.products.get(id);
  }
  
  // Cart operations
  async getCartItems() {
    return Array.from(this.cartItems.values())
      .map(item => {
        const product = this.products.get(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item) => item !== null);
  }

  async getCartItemByProductId(productId) {
    return Array.from(this.cartItems.values()).find(
      item => item.productId === productId && item.userId === 1
    );
  }

  async addToCart(insertItem) {
    const id = this.currentCartItemId++;
    // Ensure quantity is defined with a default value of 1
    const cartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id, quantity) {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) {
      throw new Error("Cart item not found");
    }
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id) {
    this.cartItems.delete(id);
  }
  
  // Wishlist operations
  async getWishlistItems() {
    return Array.from(this.wishlistItems.values())
      .map(item => {
        const product = this.products.get(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item) => item !== null);
  }

  async getWishlistItemByProductId(productId) {
    return Array.from(this.wishlistItems.values()).find(
      item => item.productId === productId && item.userId === 1
    );
  }

  async addToWishlist(insertItem) {
    const id = this.currentWishlistItemId++;
    const wishlistItem = { ...insertItem, id };
    this.wishlistItems.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id) {
    this.wishlistItems.delete(id);
  }
}

export const storage = new MemStorage();