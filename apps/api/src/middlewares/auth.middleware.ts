import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      jwt.verify(token, process.env.NX_SECRECT_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'token is not valid!' });
        }
        req['user'] = user;
        next();
      });
    }
  } catch (error) {
    return res.status(401).json({ message: 'You are not authorized!' });
  }
};

export default authMiddleware;
