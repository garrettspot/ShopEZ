import { useShop } from "@/context/ShopContext";
import { Link } from "wouter";
import WishlistItem from "@/components/WishlistItem";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { wishlistItems, products } = useShop();

  // Get product details for each wishlist item
  const wishlistItemsWithProducts = wishlistItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { item, product };
  }).filter(({ product }) => product !== undefined);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>
      
      {wishlistItemsWithProducts.length === 0 ? (
        <Card className="w-full">
          <CardContent className="pt-6 text-center">
            <div className="text-gray-400 text-5xl mb-4">
              <Heart className="mx-auto h-16 w-16" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love for later and they'll appear here.</p>
            <Link href="/">
              <Button>Explore Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItemsWithProducts.map(({ item, product }) => (
            <WishlistItem key={item.id} item={item} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}