import { useEffect } from 'react';
import api from './api';
import Navbar from './layout/Navbar';
import Home from './pages/Home'
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
      <Navbar/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
