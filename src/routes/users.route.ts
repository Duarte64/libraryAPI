import { Router } from 'express';
import UserController from '../modules/users/users.controller';

const userRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Can create and manage all users that can perform actions on the platform
 */
userRoutes.route('/')
  .post(UserController.create)

userRoutes.route('/:_id')
  .get(UserController.findOne)
  .delete(UserController.delete)

export default userRoutes;