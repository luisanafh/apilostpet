import { regularExp } from '../../../config/reggex';
import { PetPost } from '../../../data/postgres/models/pet.post.model';
import { CustomError } from '../../../domain';

export class UpdatePetPostService {
  async execute(id: string, postData: any) {
    this.validateId(id);

    const post = await this.ensurePostExists(id);

    post.pet_name = postData.pet_name || post.pet_name;
    post.description = postData.description || post.description;
    post.image_url = postData.image_url || post.image_url;
    post.isFound = postData.isFound || post.isFound;

    try {
      await post.save();
      return {
        message: 'Post updated successfully',
      };
    } catch (error) {
      throw CustomError.internalServer(
        'An error occurred while updating the post'
      );
    }
  }

  private async ensurePostExists(id: string): Promise<PetPost> {
    const post = await PetPost.findOne({
      where: {
        id: id,
      },
    });

    if (!post) {
      throw CustomError.notFound(`Post with id ${id} not found`);
    }

    return post;
  }

  private validateId(id: string): void {
    if (!regularExp.uuid.test(id)) {
      throw CustomError.badRequest('Invalid ID format');
    }
  }
}
