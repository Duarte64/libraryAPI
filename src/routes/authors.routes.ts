import multer from 'multer';
import { Router } from 'express';
import AuthorController from '../modules/authors/authors.controller';

const upload = multer();
const authorRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Can manage all the authors in the plataform
 */
authorRoutes.route('/')
    .get(AuthorController.findAll)
    .post(upload.single('profilePicture'), AuthorController.create)

authorRoutes.route('/:_id')
    .all()
    .get(AuthorController.findOne)
    .put()
    .delete()

export default authorRoutes;