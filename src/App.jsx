import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './hooks/useCart';
import { WishlistProvider } from './hooks/useWishlist';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-gray-200">
            <Header />
            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}