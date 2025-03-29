import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../../../data';
import { JwtAdapter } from '../../../config/jwt.adapter';
import { User, UserStatus } from '../../../data/postgres/models/user.model';

export class RestrictToOwnerOrAdminMiddleware {
  static validate(idParam: string = 'id') {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.cookies.token;
        const resourceId = req.params[idParam];

        if (!token)
          return res.status(401).json({ message: 'No token provided' });

        const payload = (await JwtAdapter.validateToken(token)) as {
          id: string;
          role: UserRole;
        };
        if (!payload) return res.status(401).json({ message: 'Invalid token' });

        const user = await User.findOne({
          where: { id: payload.id, status: UserStatus.ACTIVE },
        });
        if (!user) return res.status(401).json({ message: 'User not found' });

        req.body.sessionUser = user;

        if (payload.role === UserRole.ADMIN) return next();

        if (payload.id === resourceId) return next();

        return res.status(403).json({ message: 'Access denied' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };
  }
}
