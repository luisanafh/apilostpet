import { PetPost } from '../../../data/postgres/models/pet.post.model';
import { CreatePetPostDto } from '../../../domain/dtos/post-pet/create-post.dto';
import { CustomError } from '../../../domain';
import { User } from '../../../data/postgres/models/user.model';

export class CreatePetPostService {
  async execute(postData: CreatePetPostDto, userId: string) {
    if (!userId) {
      throw CustomError.unAutorized('User ID is required to create a post');
    }

    if (!postData.pet_name || !postData.description) {
      throw CustomError.badRequest('Pet name and description are required');
    }

    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw CustomError.notFound('User not found');
      }

      const petPost = new PetPost();
      petPost.pet_name = postData.pet_name;
      petPost.description = postData.description;
      petPost.image_url = postData.image_url;
      petPost.user = user;

      const createdPost = await petPost.save();

      return createdPost;
    } catch (error) {
      console.error('Error creating pet post:', error);

      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Failed to create pet post');
    }
  }
}
