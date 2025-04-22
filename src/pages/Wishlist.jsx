import { useWishlist } from '../hooks/useWishlist';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-800 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <p className="mt-2 text-lg">Your wishlist is empty</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} showMoveToCart={true} />
        ))}
      </div>
    </div>
  );
}
