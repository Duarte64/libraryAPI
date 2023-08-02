import multer from 'multer';
import paginate from '../middlewares/pagination/paginate.middleware';
import BookController from '../modules/books/books.controller';
import { Router } from 'express';
import { authenticateJwt } from '../modules/auth/middleware/jtwAuth.middleware';

const upload = multer();
const bookRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Can manage all the books in the plataform
 */
bookRoutes.route('/')
    .get(BookController.findAll, paginate)
    .post(authenticateJwt, upload.single('cover'), BookController.create)

bookRoutes.route('/:_id')
    .get(BookController.findOne)
    .put()

export default bookRoutes;