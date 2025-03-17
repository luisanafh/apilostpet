import { Router } from 'express';
import { UserController } from './controller';
import { FinderUsersService } from './services/finder-users.service';
import { RegisterUserService } from './services/register-user.service';
import { loginUsersService } from './services/login-user.service';
import { FinderUserService } from './services/finder-user.service';
import { UpdateUserService } from './services/updater-user.service';
import { DeleteUserService } from './services/eliminator-user.service';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const registerUser = new RegisterUserService();
    const finderUsers = new FinderUsersService();
    const finderUser = new FinderUserService();
    const loginUsers = new loginUsersService();
    const updateUsers = new UpdateUserService();
    const deleteUser = new DeleteUserService();

    const controller = new UserController(
      registerUser,
      finderUsers,
      finderUser,
      loginUsers,
      updateUsers,
      deleteUser
    );

    router.get('/', controller.findAll);

    router.post('/register', controller.register);

    router.get('/:id', controller.findOne);

    router.get('/login', controller.login);

    router.patch('/:id', controller.update);

    router.delete('/:id', controller.delete);
    return router;
  }
}
