import { useShop } from "@/context/ShopContext";
import { Link } from "wouter";
import CartItem from "@/components/CartItem";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  const { cartItems, products, cartTotal } = useShop();

  // Get product details for each cart item
  const cartItemsWithProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { item, product: product! };
  }).filter(({ product }) => product !== undefined);

  // Calculate additional costs
  const shipping = cartItemsWithProducts.length > 0 ? 99 : 0;
  const tax = cartTotal * 0.12; // Assuming 12% tax
  const finalTotal = cartTotal + shipping + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          {cartItemsWithProducts.length === 0 ? (
            <Card className="w-full">
              <CardContent className="pt-6 text-center">
                <div className="text-gray-400 text-5xl mb-4">
                  <ShoppingCart className="mx-auto h-16 w-16" />
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link href="/ShopEZ">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {cartItemsWithProducts.map(({ item, product }) => (
                <CartItem key={item.id} item={item} product={product} />
              ))}
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        {cartItemsWithProducts.length > 0 && (
          <div className="w-full lg:w-1/3">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItemsWithProducts.length} items)</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-lg">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => {
                    mockCartItems.clear();
                    window.location.reload();
                  }}>
                  Proceed to Checkout
                </Button>
                
                <div className="mt-6">
                  <div className="mb-3">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">Apply Coupon</label>
                    <div className="flex space-x-2">
                      <Input 
                        type="text" 
                        id="coupon" 
                        placeholder="Enter coupon code" 
                      />
                      <Button variant="secondary">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
