import { Router } from 'express';
import BookController from '../modules/books/books.controller';

const bookRoutes = Router();

bookRoutes.route('/')
    .get(BookController.findAll)
    .post(BookController.create)

bookRoutes.route('/:_id')
    .all()
    .get(BookController.findOne)
    .put()
    .delete()

export default bookRoutes;