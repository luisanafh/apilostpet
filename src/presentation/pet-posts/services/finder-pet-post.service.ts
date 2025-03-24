import {
  PetPost,
  PetPostStatus,
} from '../../../data/postgres/models/pet.post.model';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async execute(id: string) {
    try {
      const post = await PetPost.findOne({
        relations: ['user'],
        select: {
          id: true,
          pet_name: true,
          description: true,
          image_url: true,
          isFound: true,
          user: {
            name: true,
          },
        },
        where: {
          id: id,
          status: PetPostStatus.APPROVED,
        },
      });

      if (!post) {
        throw CustomError.notFound('Post not found');
      }

      return post;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(
        'An error occurred while searching for the post'
      );
    }
  }
}
