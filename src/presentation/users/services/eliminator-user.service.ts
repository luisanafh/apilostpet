import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';

export class DeleteUserService {
  async execute(userId: string) {
    const user = await this.ensureUserExists(userId);

    user.status = UserStatus.INACTIVE;
    try {
      await user.save();
    } catch (error) {
      throw new Error('Error trying to delete user');
    }

    return true;
  }

  private async ensureUserExists(userId: string) {
    const user = await User.findOne({
      select: ['id'],
      where: {
        id: userId,
        status: UserStatus.ACTIVE,
      },
    });

    if (!user) {
      throw new Error(`User with id: ${userId} not found`);
    }

    return user;
  }
}
