import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';

export class FinderUserService {
  async execute(id: string) {
    try {
      const user = await User.findOne({
        select: ['id', 'name', 'email', 'role', 'status'],
        where: {
          id: id,
          status: UserStatus.ACTIVE,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('An error occurred while searching for the user');
    }
  }
}
