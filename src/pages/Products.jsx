import { useState, useEffect } from 'react';
import { productsData } from '../../products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const categories = ['All', ...new Set(productsData.map(product => product.category))];

  useEffect(() => {
    setProducts(productsData);
    setFilteredProducts(productsData);
    
    // Listen for search events from header
    const handleSearch = (e) => setSearchQuery(e.detail);
    window.addEventListener('search', handleSearch);
    return () => window.removeEventListener('search', handleSearch);
  }, []);

  useEffect(() => {
    let result = products;
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    result = result.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products, minPrice, maxPrice]);

  return (
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg">No products match your criteria. Try adjusting your filters.</p>
        </div>
      )}
    </>
  );
}
