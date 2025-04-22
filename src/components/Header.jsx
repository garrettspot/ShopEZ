import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

export default function Header() {
  const location = useLocation();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  
  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-purple-400 mr-8">
            ShopEZ
          </Link>
          {location.pathname === '/' && (
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => window.dispatchEvent(new CustomEvent('search', { detail: e.target.value }))}
              />
            </div>
          )}
        </div>
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md ${location.pathname === '/' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Products
          </Link>
          <Link
            to="/wishlist"
            className={`px-4 py-2 rounded-md flex items-center ${location.pathname === '/wishlist' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Wishlist {wishlist.length > 0 && <span className="ml-2 bg-purple-500 px-2 rounded-full">{wishlist.length}</span>}
          </Link>
          <Link
            to="/cart"
            className={`px-4 py-2 rounded-md flex items-center ${location.pathname === '/cart' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            Cart {cart.length > 0 && <span className="ml-2 bg-purple-500 px-2 rounded-full">{cart.reduce((total, item) => total + item.quantity, 0)}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
