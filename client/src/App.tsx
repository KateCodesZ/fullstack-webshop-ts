import { Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Footer from './layout/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
