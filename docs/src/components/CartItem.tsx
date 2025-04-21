import { useShop } from "@/context/ShopContext";
import { Product, CartItem as CartItemType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  product: Product;
}

export default function CartItem({ item, product }: CartItemProps) {
  const { updateCartQuantity, removeFromCart } = useShop();

  const handleIncreaseQuantity = () => {
    updateCartQuantity(product.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartQuantity(product.id, item.quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="cart-item bg-white rounded-lg shadow overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-32 h-32">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow p-4 flex flex-col sm:flex-row">
          <div className="flex-grow">
            <div className="text-xs text-gray-500 mb-1">{product.category}</div>
            <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
            <div className="text-primary font-semibold">{formatPrice(product.price)}</div>
          </div>
          <div className="flex items-center justify-between sm:flex-col sm:justify-center mt-4 sm:mt-0">
            <div className="flex items-center border rounded-md">
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={handleDecreaseQuantity}
              >-</button>
              <span className="px-3 py-1 border-x">{item.quantity}</span>
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={handleIncreaseQuantity}
              >+</button>
            </div>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-3 hidden sm:inline-flex"
              onClick={handleRemoveFromCart}
            >
              <Trash className="h-4 w-4 mr-1" /> Remove
            </Button>
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 sm:hidden"
              onClick={handleRemoveFromCart}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
