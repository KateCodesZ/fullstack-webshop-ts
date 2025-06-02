import { Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './layout/Footer';
import Card from './pages/Card';
import Cart from './pages/Cart';
import { useState } from 'react';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/card/:id" element={<Card />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
