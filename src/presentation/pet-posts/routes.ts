import { Router } from 'express';
import { PostController } from './controller';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { UpdatePetPostService } from './services/updater-pet-post.service';
import { DeletePetPostService } from './services/eliminator-pet-post.service';

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

    router.get('/:id', controller.findOne);

    router.post('/', controller.creator);

    router.patch('/:id', controller.update);

    router.delete('/:id', controller.delete);

    return router;
  }
}
