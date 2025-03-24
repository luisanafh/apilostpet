import { Request, Response } from 'express';
import { CustomError, CreatePetPostDto, UpdatePetPostDto } from '../../domain';
import {
  CreatePetPostService,
  FinderPetPostsService,
  UpdatePetPostService,
  FinderPetPostService,
  DeletePetPostService,
} from './services';

export class PostController {
  constructor(
    private readonly createPost: CreatePetPostService,
    private readonly finderPosts: FinderPetPostsService,
    private readonly finderPost: FinderPetPostService,
    private readonly updatePost: UpdatePetPostService,
    private readonly deletePost: DeletePetPostService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went very wrong' });
  };
  findAll = (req: Request, res: Response) => {
    this.finderPosts
      .execute()
      .then((posts) => res.status(200).json(posts))
      .catch((err) => this.handleError(err, res));
  };

  creator = (req: Request, res: Response) => {
    const [error, createPetPostDto] = CreatePetPostDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }
    this.createPost
      .execute(createPetPostDto!)
      .then((createPost) => res.status(201).json(createPost))
      .catch((err) => this.handleError(err, res));
  };
  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderPost
      .execute(id)
      .then((post) => res.status(200).json(post))
      .catch((err) => this.handleError(err, res));
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
      .catch((err) => this.handleError(err, res));
  };

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deletePost
      .execute(id)
      .then(() => res.status(204).json(null))
      .catch((err) => this.handleError(err, res));
  };
}
