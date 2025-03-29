import { NextFunction, Request, Response } from 'express';
import { PetPost } from '../../../data/postgres/models/pet.post.model';
import { UserRole } from '../../../data';
import { JwtAdapter } from '../../../config/jwt.adapter';

export class PostOwnershipMiddleware {
  static restrictPostOwnerOrAdmin(postIdParam: string = 'id') {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const postId = req.params[postIdParam];
        const { sessionUser } = req.body;

        if (sessionUser.role === UserRole.ADMIN) {
          return next();
        }

        const post = await PetPost.findOne({
          where: { id: postId },
          relations: ['user'],
        });

        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.id === sessionUser.id) {
          return next();
        }

        return res.status(403).json({
          message: 'You are not authorized to edit this post',
        });
      } catch (error) {
        console.error('PostOwnershipMiddleware error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };
  }
}
