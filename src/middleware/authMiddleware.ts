import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;
declare global {
  namespace Express {
    interface Request {

      user?: string | JwtPayload | undefined;
    }
  }
}
export const authMiddleware = (req: Request, res: Response,
  next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')
  [1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'Invalid token'
      });
    }
    req.user = decoded;
    next();
  });
};