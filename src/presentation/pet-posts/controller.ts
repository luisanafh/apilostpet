import { Request, Response } from 'express';
import { CreatePetPostService } from './services/creator-pet-post.service';
import { FinderPetPostsService } from './services/finder-pet-posts.service';
import { UpdatePetPostService } from './services/updater-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { DeletePetPostService } from './services/eliminator-pet-post.service';
import { CreatePetPostDto } from '../../domain/dtos/post-pet/create-post.dto';
import { UpdatePetPostDto } from '../../domain/dtos/post-pet/update.post.dto';
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
    const [error, createPetPostDto] = CreatePetPostDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }
    this.createPost
      .execute(createPetPostDto!)
      .then((createPost) => res.status(201).json(createPost))
      .catch((error) => res.status(500).json({ message: error.message }));
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
    const [error, updatePetPostDto] = UpdatePetPostDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.updatePost
      .execute(id, updatePetPostDto!)
      .then((user) => res.status(200).json(user))
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
