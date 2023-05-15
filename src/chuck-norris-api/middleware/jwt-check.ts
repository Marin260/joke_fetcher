import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  name: string;
  iat: number; // default field: change if overwriting or removing
  exp: number; // default field: change if overwriting or removing
}

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Middleware::validateJWT() - Validating JWT token');
  const auth = req.header('Authorization');
  if (auth) {
    try {
      const user = jwt.verify(
        auth.replace('Bearer', '').replace(/ /g, ''),
        process.env.JWT_SECRET ? process.env.JWT_SECRET : 'super-secret-key'
      ) as JwtPayload;
      req.body.authenticatedUser = user.name;
    } catch (error) {
      console.log('Middleware::validateJWT() - Error: Invalid Bearer token');
      return res.status(401).json({ error: 'Invalid Bearer token' });
    }
  }
  next();
};
