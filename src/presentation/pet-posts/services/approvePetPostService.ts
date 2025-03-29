import { regularExp } from '../../../config/reggex';
import { PetPost, PetPostStatus } from '../../../data';
import { CustomError } from '../../../domain';

export class ApprovePetPostService {
  async execute(postId: string) {
    this.validateId(postId);
    try {
      const post = await PetPost.findOneBy({ id: postId });

      if (!post) {
        throw CustomError.notFound('Post not found');
      }

      if (post.status === PetPostStatus.APPROVED) {
        throw CustomError.badRequest('Post is already approved');
      }

      post.status = PetPostStatus.APPROVED;
      await post.save();

      return {
        message: 'Post approved successfully',
        postId: post.id,
        newStatus: post.status,
      };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer('Error approving post');
    }
  }
  private validateId(id: string): void {
    if (!regularExp.uuid.test(id)) {
      throw CustomError.badRequest('Invalid ID format');
    }
  }
}
