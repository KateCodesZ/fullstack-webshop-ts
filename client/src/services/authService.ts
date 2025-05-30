import axios from 'axios';

// Login: expects { email, password }
export async function login(values: { email: string; password: string }) {
  const response = await axios.post('/api/auth/login', values, { withCredentials: true });
  return response.data;
}

// Register: expects { name, email, password }
export async function register(values: { name: string; email: string; password: string }) {
  const response = await axios.post('/api/auth/register', values, { withCredentials: true });
  return response.data;
}
