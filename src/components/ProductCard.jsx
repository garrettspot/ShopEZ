import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

export default function ProductCard({ product, showMoveToCart }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-contain bg-white p-4"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-70 rounded-full hover:bg-opacity-100"
        >
          {isInWishlist(product.id) ? (
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-4">
        <span className="text-xs font-medium bg-purple-500 bg-opacity-30 text-purple-300 px-2 py-1 rounded-full">
          {product.category}
        </span>
        <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
        <p className="mt-1 text-gray-400 text-sm line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center text-sm">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{product.rating?.rate || 0}</span>
          <span className="mx-1">•</span>
          <span>{product.rating?.count || 0} reviews</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="font-bold text-purple-400">${product.price}</span>
          <button
            onClick={() => {
              if (showMoveToCart) {
                addToCart(product);
                toggleWishlist(product);
              } else {
                addToCart(product);
              }
            }}
            className={`${isInCart(product.id) ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'} text-white px-3 py-1 rounded-md transition-colors`}
          >
            {showMoveToCart ? 'Move to Cart' : isInCart(product.id) ? 'Add More' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
