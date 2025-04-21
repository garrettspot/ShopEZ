import { useShop } from "@/context/ShopContext";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, removeFromWishlist, isInCart, isInWishlist } = useShop();

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const formatPrice = (price) => {
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
          className={`absolute top-2 right-2 bg-white rounded-full p-2 shadow transition-colors ${
            isInWishlist(product.id) ? "text-[#F97316]" : "text-gray-500 hover:text-[#F97316]"
          }`}
          onClick={handleToggleWishlist}
        >
          <Heart className={isInWishlist(product.id) ? "fill-[#F97316]" : ""} size={16} />
        </button>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">{product.name}</h3>
        <div className="flex justify-between items-center">
          <div className="text-primary font-semibold">{formatPrice(product.price)}</div>
          {isInCart(product.id) ? (
            <Button
              variant="secondary"
              size="sm"
              className="text-gray-800"
              disabled
            >
              In Cart
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}