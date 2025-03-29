import { regularExp } from '../../../config/reggex';
import {
  PetPost,
  PetPostStatus,
} from '../../../data/postgres/models/pet.post.model';
import { CustomError } from '../../../domain';

export class FinderPetPostService {
  async execute(id: string) {
    this.validateId(id);

    try {
      const post = await PetPost.findOne({
        relations: ['user'],
        where: {
          id: id,
          status: PetPostStatus.APPROVED,
        },
        select: {
          id: true,
          pet_name: true,
          description: true,
          image_url: true,
          isFound: true,
          user: {
            id: true,
            name: true,
            email: true,
          },
        },
      });

      if (!post) {
        throw CustomError.notFound('Post not found');
      }

      return {
        ...post,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(
        'An error occurred while searching for the post'
      );
    }
  }

  private validateId(id: string): void {
    if (!regularExp.uuid.test(id)) {
      throw CustomError.badRequest('Invalid ID format');
    }
  }
}
