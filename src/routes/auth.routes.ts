import { Router } from 'express';
import AuthController from '../modules/auth/auth.controller';

const authRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Can manage logins in the platform
 */
authRoutes.route('/')
  .post(AuthController.signin)

export default authRoutes;