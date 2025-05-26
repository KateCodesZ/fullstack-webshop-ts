import { useEffect } from 'react';
import api from './api';

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
      Check!
    </div>
  );
}

export default App;
