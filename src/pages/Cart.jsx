import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert(`Checkout completed! Total: $${calculateTotal()}`);
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="mt-2 text-lg">Your cart is empty</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col sm:flex-row p-4 border-b border-gray-700 last:border-0">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-700 rounded-l-md hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-700 rounded-r-md hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 mt-3">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-purple-400">
                  ${(Number(calculateTotal()) + Number((calculateTotal() * 0.1).toFixed(2))).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
          >
            Checkout
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 py-2 border border-gray-600 hover:border-gray-500 rounded-md text-center transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
