import { users, User, InsertUser, Product, InsertProduct, CartItem, InsertCartItem, WishlistItem, InsertWishlistItem } from "@shared/schema";
import { mockProducts } from "./mockData";

// Interface defining all the CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  
  // Cart operations
  getCartItems(): Promise<(CartItem & { product: Product })[]>;
  getCartItemByProductId(productId: number): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  
  // Wishlist operations
  getWishlistItems(): Promise<(WishlistItem & { product: Product })[]>;
  getWishlistItemByProductId(productId: number): Promise<WishlistItem | undefined>;
  addToWishlist(item: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private wishlistItems: Map<number, WishlistItem>;
  private currentUserId: number;
  private currentCartItemId: number;
  private currentWishlistItemId: number;

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

  private initializeMockData() {
    mockProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  // Cart operations
  async getCartItems(): Promise<(CartItem & { product: Product })[]> {
    return Array.from(this.cartItems.values())
      .map(item => {
        const product = this.products.get(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is CartItem & { product: Product } => item !== null);
  }

  async getCartItemByProductId(productId: number): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      item => item.productId === productId && item.userId === 1
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    // Ensure quantity is defined with a default value of 1
    const cartItem: CartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) {
      throw new Error("Cart item not found");
    }
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }
  
  // Wishlist operations
  async getWishlistItems(): Promise<(WishlistItem & { product: Product })[]> {
    return Array.from(this.wishlistItems.values())
      .map(item => {
        const product = this.products.get(item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is WishlistItem & { product: Product } => item !== null);
  }

  async getWishlistItemByProductId(productId: number): Promise<WishlistItem | undefined> {
    return Array.from(this.wishlistItems.values()).find(
      item => item.productId === productId && item.userId === 1
    );
  }

  async addToWishlist(insertItem: InsertWishlistItem): Promise<WishlistItem> {
    const id = this.currentWishlistItemId++;
    const wishlistItem: WishlistItem = { ...insertItem, id };
    this.wishlistItems.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id: number): Promise<void> {
    this.wishlistItems.delete(id);
  }
}

export const storage = new MemStorage();
