import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db/db';
import { User } from '../types';
import { generateToken } from '../config/jwt';
import { validationResult } from 'express-validator';

interface AuthRequestBody {
  email: string;
  password: string;
}

export const registerUser = async (req: Request<{}, {}, AuthRequestBody>, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const { rows: [existingUser] } = await pool.query<User>(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const hash = await bcrypt.hash(password, 12);
    const { rows: [user] } = await pool.query<User>(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email, is_admin, created_at`,
      [email.toLowerCase(), hash]
    );

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request<{}, {}, AuthRequestBody>, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const { rows: [user] } = await pool.query<User>(
      `SELECT id, email, password_hash, is_admin
       FROM users
       WHERE email = $1`,
      [email.toLowerCase()]
    );

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (!user.password_hash) {
      res.status(500).json({ message: 'User password is not set' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
