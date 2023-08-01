import multer from 'multer';
import { Router } from 'express';
import BookController from '../modules/books/books.controller';
import paginate from '../middlewares/pagination/paginate.middleware';

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
    .post(upload.single('cover'), BookController.create)

bookRoutes.route('/:_id')
    .all()
    .get(BookController.findOne)
    .put()
    .delete()

export default bookRoutes;