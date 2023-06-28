import { Router } from 'express';
import BookController from '../modules/books/book.controller';

const bookRoutes = Router();

bookRoutes.route('/books')
    .get(BookController.findAll)
    .post(BookController.create)

bookRoutes.route('/:id')
    .all()
    .get()
    .put()
    .delete()

export default bookRoutes;