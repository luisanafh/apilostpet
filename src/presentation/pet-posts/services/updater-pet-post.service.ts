import { PetPost } from '../../../data/postgres/models/pet.post.model';

export class UpdatePetPostService {
  async execute(Id: string, postData: any) {
    const post = await this.ensurePostExists(Id);
    post.pet_name = postData.pet_name || post.pet_name;
    post.description = postData.description || post.description;
    post.image_url = postData.image_url || post.image_url;
    post.isFound = postData.isFound || post.isFound;

    try {
      const updatedPost = await post.save();
      return {
        message: 'post updated successfully',
      };
    } catch (error) {
      throw new Error('An error occurred while updating the post');
    }
  }

  private async ensurePostExists(Id: string): Promise<PetPost> {
    const post = await PetPost.findOne({
      where: {
        id: Id,
      },
    });

    if (!post) {
      throw new Error(`Post with id: ${Id} not found`);
    }

    return post;
  }
}
