import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { PetPostRoutes } from './pet-posts/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/petpost', PetPostRoutes.routes);
    return router;
  }
}
