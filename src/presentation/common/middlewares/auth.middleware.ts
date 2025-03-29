import { NextFunction, Request, Response } from 'express';
import {
  User,
  UserRole,
  UserStatus,
} from '../../../data/postgres/models/user.model';
import { JwtAdapter } from '../../../config/jwt.adapter';

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };
      if (!payload) return res.status(401).json({ message: 'Invalid Token' });

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: UserStatus.ACTIVE,
        },
      });
      if (!user) return res.status(401).json({ message: 'Invalid user' });

      req.body.sessionUser = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static restrictTo = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.sessionUser.role)) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to access this route' });
      }
      next();
    };
  };
}
