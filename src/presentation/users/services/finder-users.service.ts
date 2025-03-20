import { User } from '../../../data/postgres/models/user.model';
import { UserStatus } from '../../../data/postgres/models/user.model';

export class FinderUsersService {
  async execute() {
    try {
      const users = await User.find({
        select: ['id', 'name', 'email', 'role'],
        where: { status: UserStatus.ACTIVE },
      });

      return users;
    } catch (error) {
      throw new Error('An error occurred while searching for users');
    }
  }
}
