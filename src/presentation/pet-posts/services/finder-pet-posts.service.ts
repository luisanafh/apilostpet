import {
  PetPost,
  PetPostStatus,
} from '../../../data/postgres/models/pet.post.model';
import { CustomError } from '../../../domain';

export class FinderPetPostsService {
  async execute() {
    try {
      const petPosts = await PetPost.find({
        relations: ['user'],
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
        where: { status: PetPostStatus.APPROVED },
      });

      return {
        ...petPosts,
      };
    } catch (error) {
      throw CustomError.internalServer(
        'An error occurred while searching for pet posts'
      );
    }
  }
}
