import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        is_admin: boolean;
      };
    }
  }
}
