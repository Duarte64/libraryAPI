import multer from 'multer';
import paginate from '../middlewares/pagination/paginate.middleware';
import { Router } from 'express';
import AuthorController from '../modules/authors/authors.controller';
import { authenticateJwt } from '../modules/auth/middleware/jtwAuth.middleware';

const upload = multer();
const authorRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Can manage all the authors in the plataform
 */
authorRoutes.route('/')
    .get(AuthorController.findAll, paginate)
    .post(authenticateJwt, upload.single('profilePicture'), AuthorController.create)

authorRoutes.route('/:_id')
    .get(AuthorController.findOne)

export default authorRoutes;