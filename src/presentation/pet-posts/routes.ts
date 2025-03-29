import { Router } from 'express';
import { PostController } from './controller';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { UpdatePetPostService } from './services/updater-pet-post.service';
import { DeletePetPostService } from './services/eliminator-pet-post.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRole } from '../../data';
import { PostOwnershipMiddleware } from '../common/middlewares/restricpost.middleware';

export class PetPostRoutes {
  static get routes(): Router {
    const creatorPost = new CreatePetPostService();
    const finderPosts = new FinderPetPostsService();
    const finderPost = new FinderPetPostService();
    const updatePost = new UpdatePetPostService();
    const deletePost = new DeletePetPostService();

    const controller = new PostController(
      creatorPost,
      finderPosts,
      finderPost,
      updatePost,
      deletePost
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

    return router;
  }
}
