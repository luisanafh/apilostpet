import { User } from '../../../data/postgres/models/user.model';

export class FinderUsersService {
  async execute() {
    try {
      return await User.find({
        select: ['id', 'name', 'email', 'role', 'status'],
      });
    } catch (error) {
      throw new Error('an error occrred  while searching for users');
    }
  }
}
