import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';
import { UpdateUserDto } from '../../../domain/dtos/users/update-user.dto';

export class UpdateUserService {
  async execute(userId: string, userData: UpdateUserDto) {
    const user = await this.ensureUserExists(userId);
    user.name = userData.name || user.name;
    user.email = userData.email || user.email;

    try {
      await user.save();
      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new Error('An error occurred while updating the user');
    }
  }

  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
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
