import jwt from 'jsonwebtoken';
import { User, JwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable not configured');

export const generateToken = (user: User): string => {
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    is_admin: user.is_admin
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
