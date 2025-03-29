import { Router } from 'express';
import { PostController } from './controller';
import {
  CreatePetPostService,
  FinderPetPostsService,
  UpdatePetPostService,
  FinderPetPostService,
  DeletePetPostService,
  RejectPetPostService,
  ApprovePetPostService,
} from './services';
import { UserRole } from '../../data';
import { PostOwnershipMiddleware } from '../common/middlewares/restricpost.middleware';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';

export class PetPostRoutes {
  static get routes(): Router {
    const creatorPost = new CreatePetPostService();
    const finderPosts = new FinderPetPostsService();
    const finderPost = new FinderPetPostService();
    const updatePost = new UpdatePetPostService();
    const deletePost = new DeletePetPostService();
    const approvedPost = new ApprovePetPostService();
    const rejectPost = new RejectPetPostService();

    const controller = new PostController(
      creatorPost,
      finderPosts,
      finderPost,
      updatePost,
      deletePost,
      approvedPost,
      rejectPost
    );

    const router = Router();

    router.get('/', controller.findAll);

    router.use(AuthMiddleware.protect);
    router.get('/:id', controller.findOne);
    router.post('/', controller.creator);
    router.patch(
      '/:id',
      PostOwnershipMiddleware.restrictPostOwnerOrAdmin(),
      controller.update
    );

    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.delete
    );
    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.approve
    );

    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.reject
    );
    return router;
  }
}
