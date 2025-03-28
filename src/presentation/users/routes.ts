import { Router, Request, Response } from 'express';
import { UserController } from './controller';
import {
  DeleteUserService,
  FinderUserService,
  FinderUsersService,
  RegisterUserService,
  UpdateUserService,
  LoginUserService,
} from './services/index';
import { EmailService } from '../common/services/email.service';
import { envs } from '../../config';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRole } from '../../data';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_MAIL
    );

    const finderUsers = new FinderUsersService();
    const registerUser = new RegisterUserService(emailService);
    const finderUser = new FinderUserService();
    const updateUser = new UpdateUserService();
    const deleteUser = new DeleteUserService();
    const loginUser = new LoginUserService();

    const controller = new UserController(
      registerUser,
      finderUsers,
      finderUser,
      updateUser,
      deleteUser,
      loginUser
    );

    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/validate-account/:token', controller.validateAccount);
    router.use(AuthMiddleware.protect);
    router.get('/', controller.findAll);
    router.get('/:id', controller.findOne);
    router.patch('/:id', controller.update);
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.delete
    );
    return router;
  }
}
