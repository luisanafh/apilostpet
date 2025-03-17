import {
  PetPost,
  PetPostStatus,
} from '../../../data/postgres/models/pet.post.model';

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
        throw new Error('Post not found');
      }

      return post;
    } catch (error) {
      throw new Error('An error occurred while searching for the post');
    }
  }
}
