import { Request, Response } from 'express';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { UpdatePetPostService } from './services/updater-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { DeletePetPostService } from './services/eliminator-pet-post.service';
export class PostController {
  constructor(
    private readonly createPost: CreatePetPostService,
    private readonly finderPosts: FinderPetPostsService,
    private readonly finderPost: FinderPetPostService,
    private readonly updatePost: UpdatePetPostService,
    private readonly deletePost: DeletePetPostService
  ) {}

  findAll = (req: Request, res: Response) => {
    this.finderPosts.execute().then((posts) => res.status(200).json(posts));
  };
  creator = (req: Request, res: Response) => {
    const postData = req.body;

    this.createPost
      .execute(postData)
      .then((createdPost) => {
        res.status(201).json(createdPost);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  };
  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderPost
      .execute(id)
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.updatePost
      .execute(id, req.body)
      .then((post) => res.status(200).json(post))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deletePost
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
}
