import { regularExp } from '../../../config/reggex';
import { PetPost, PetPostStatus } from '../../../data';
import { CustomError } from '../../../domain';

export class RejectPetPostService {
  async execute(postId: string) {
    this.validateId(postId);
    try {
      const post = await PetPost.findOneBy({ id: postId });

      if (!post) {
        throw CustomError.notFound('Post not found');
      }
      if (post.status === PetPostStatus.REJECTED) {
        throw CustomError.badRequest('Post is already rejected');
      }

      post.status = PetPostStatus.REJECTED;
      await post.save();

      return {
        message: 'Post rejected successfully',
        postId: post.id,
        newStatus: post.status,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer('Error rejecting post');
    }
  }
  private validateId(id: string): void {
    if (!regularExp.uuid.test(id)) {
      throw CustomError.badRequest('Invalid ID format');
    }
  }
}
