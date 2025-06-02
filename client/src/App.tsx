import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './layout/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './layout/Footer';
import Card from './pages/Card';
import Cart from './pages/Cart';
import MinaSidor from './pages/MyPages';
import ScrollToTop from './components/ScrollToTop';
import CheckoutPage from './pages/Checkout';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div>
      <ScrollToTop />
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/minasidor" element={<MinaSidor />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
