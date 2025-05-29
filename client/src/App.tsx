import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from './api';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './layout/Footer';

function App() {
  useEffect(() => {
    api.get('/products')
      .then(res => {
        alert('Connection to backend successful! Products: ' + res.data.length);
      })
      .catch(() => {
        alert('Error connecting to backend!');
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
