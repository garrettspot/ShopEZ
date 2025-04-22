import { useState, useEffect } from 'react';

// Mock product data (in a real app, this would come from an API or local JSON file)
const productsData = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', image: 'https://www.leafstudios.in/cdn/shop/files/Mainupdated_35a234be-57a2-41b6-b8db-79b54b7f5a7f_800x.jpg?v=1690372991', description: 'High-quality wireless headphones with noise cancellation.' },
  { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', image: 'https://cdn.mos.cms.futurecdn.net/qDiWC728ZbsZJuP34meocG-1200-80.jpg', description: 'Feature-rich smartwatch with fitness tracking.' },
  { id: 3, name: 'Running Shoes', price: 79.99, category: 'Footwear', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/01190add819e47c8a092653b9fd29bac_9366/Runfalcon_5_Running_Shoes_Black_IH7758_HM1.jpg', description: 'Comfortable running shoes with excellent support.' },
  { id: 4, name: 'Yoga Mat', price: 29.99, category: 'Fitness', image: 'https://wiselife.in/cdn/shop/files/1_c32957ca-8b92-4e21-b32d-395717efbd7d.jpg?v=1708681826', description: 'Non-slip yoga mat for comfortable practice.' },
  { id: 5, name: 'Coffee Maker', price: 149.99, category: 'Kitchen', image: 'https://m.media-amazon.com/images/I/818gyfjYmZL.jpg', description: 'Programmable coffee maker with timer.' },
  { id: 6, name: 'Bluetooth Speaker', price: 59.99, category: 'Electronics', image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MW443?wid=1720&hei=1338&fmt=jpeg&qlt=95&.v=1716251410589', description: 'Portable Bluetooth speaker with deep bass.' },
  { id: 7, name: 'Casual Shirt', price: 34.99, category: 'Clothing', image: 'https://pictures.kartmax.in/live/sites/aPfvUDpPwMn1ZadNKhP7/product-images/8905745177197/660/HLSH013833_1.jpg', description: 'Comfortable casual shirt for everyday wear.' },
  { id: 8, name: 'Jeans', price: 49.99, category: 'Clothing', image: 'https://assets.ajio.com/medias/sys_master/root/20240809/zVaK/66b5f1a81d763220fa6d0099/-473Wx593H-700275258-blue-MODEL.jpg', description: 'Classic fit denim jeans.' },
  { id: 9, name: 'Blender', price: 69.99, category: 'Kitchen', image: 'https://images-cdn.ubuy.co.in/64ca0e4da858e121b25ce6f4-vevor-professional-blender-commercial.jpg', description: 'High-speed blender for smoothies and more.' },
  { id: 10, name: 'Digital Camera', price: 399.99, category: 'Electronics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3iHhYL24jLgOfSoukjlzY6yD8nom6vBW5MQ&s', description: 'High-resolution digital camera for photography enthusiasts.' },
  { id: 11, name: 'Hiking Boots', price: 89.99, category: 'Footwear', image: 'https://m.media-amazon.com/images/I/81L6MkiyPlL._AC_UY1000_.jpg', description: 'Durable hiking boots for outdoor adventures.' },
  { id: 12, name: 'Fitness Tracker', price: 79.99, category: 'Fitness', image: 'https://m.media-amazon.com/images/I/61YwaovfYFL.jpg', description: 'Track your steps, sleep, and more.' },
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [view, setView] = useState('products'); // 'products', 'cart', 'wishlist'
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Categories for filter
  const categories = ['All', ...new Set(productsData.map(product => product.category))];

  // Fetch products
  useEffect(() => {
    // Simulate API fetch
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  // Filter products based on search, category, and price
  useEffect(() => {
    let result = products;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products, minPrice, maxPrice]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Update cart item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Toggle wishlist item
  const toggleWishlist = (product) => {
    const inWishlist = wishlist.find(item => item.id === product.id);
    if (inWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Handler for checkout
  const handleCheckout = () => {
    alert(`Checkout completed! Total: $${calculateTotal()}`);
    setCart([]);
    setView('products');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-purple-400 mr-8 cursor-pointer" onClick={() => setView('products')}>
              ShopEZ
            </h1>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <button 
              className={`px-4 py-2 rounded-md ${view === 'products' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setView('products')}
            >
              Products
            </button>
            <button 
              className={`px-4 py-2 rounded-md flex items-center ${view === 'wishlist' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setView('wishlist')}
            >
              Wishlist {wishlist.length > 0 && <span className="ml-2 bg-purple-500 px-2 rounded-full">{wishlist.length}</span>}
            </button>
            <button 
              className={`px-4 py-2 rounded-md flex items-center ${view === 'cart' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setView('cart')}
            >
              Cart {cart.length > 0 && <span className="ml-2 bg-purple-500 px-2 rounded-full">{cart.reduce((total, item) => total + item.quantity, 0)}</span>}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {view === 'products' && (
          <>
            {/* Filters */}
            <div className="mb-8 bg-gray-800 p-4 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">Filters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="mb-2 font-medium">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-md text-sm ${selectedCategory === category ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Price Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Min Price</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Max Price</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Results</h3>
                  <p>{filteredProducts.length} products found</p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover"
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
                      <span className="text-xs font-medium bg-purple-500 bg-opacity-30 text-purple-300 px-2 py-1 rounded-full">{product.category}</span>
                      <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
                      <p className="mt-1 text-gray-400 text-sm line-clamp-2">{product.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="font-bold text-purple-400">${product.price}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className={`${isInCart(product.id) ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'} text-white px-3 py-1 rounded-md transition-colors`}
                        >
                          {isInCart(product.id) ? 'Add More' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg">No products match your criteria. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}

        {/* Wishlist View */}
        {view === 'wishlist' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Your Wishlist</h2>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map(product => (
                  <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover"
                      />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-70 rounded-full hover:bg-opacity-100"
                      >
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium bg-purple-500 bg-opacity-30 text-purple-300 px-2 py-1 rounded-full">{product.category}</span>
                      <h3 className="mt-2 text-lg font-medium">{product.name}</h3>
                      <p className="mt-1 text-gray-400 text-sm line-clamp-2">{product.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="font-bold text-purple-400">${product.price}</span>
                        <button
                          onClick={() => {
                            addToCart(product);
                            toggleWishlist(product);
                          }}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="mt-2 text-lg">Your wishlist is empty</p>
                <button
                  onClick={() => setView('products')}
                  className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
                >
                  Explore Products
                </button>
              </div>
            )}
          </div>
        )}

        {/* Cart View */}
        {view === 'cart' && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Your Cart</h2>
            {cart.length > 0 ? (
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
                          <span className="text-purple-400">${(Number(calculateTotal()) + Number((calculateTotal() * 0.1).toFixed(2))).toFixed(2)}</span>
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
                      onClick={() => setView('products')}
                      className="w-full mt-3 py-2 border border-gray-600 hover:border-gray-500 rounded-md text-center transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="mt-2 text-lg">Your cart is empty</p>
                <button
                  onClick={() => setView('products')}
                  className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 mt-12 py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 DarkShop. All rights reserved.</p>
            <p className="mt-2">This is a demo e-commerce website built with React.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}