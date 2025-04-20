import { useShop } from "@/context/ShopContext";
import { Product, WishlistItem as WishlistItemType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Heart, Trash, ShoppingCart } from "lucide-react";

interface WishlistItemProps {
  item: WishlistItemType;
  product: Product;
}

export default function WishlistItem({ item, product }: WishlistItemProps) {
  const { addToCart, removeFromWishlist, isInCart } = useShop();

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-card bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <button 
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow text-[#F97316]"
          onClick={handleRemoveFromWishlist}
        >
          <Heart className="fill-[#F97316]" size={16} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
        <div className="text-primary font-semibold">{formatPrice(product.price)}</div>
        <div className="mt-3 flex space-x-2">
          {isInCart(product.id) ? (
            <Button
              variant="secondary"
              className="flex-grow text-gray-800"
              disabled
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> In Cart
            </Button>
          ) : (
            <Button
              variant="default"
              className="flex-grow"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
            </Button>
          )}
          <Button
            variant="outline"
            className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border-red-100"
            onClick={handleRemoveFromWishlist}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
