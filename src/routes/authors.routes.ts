import { Router } from 'express';
import AuthorController from '../modules/authors/authors.controller';

const authorRoutes = Router();

authorRoutes.route('/')
    .get(AuthorController.findAll)
    .post(AuthorController.create)

authorRoutes.route('/:_id')
    .all()
    .get()
    .put()
    .delete()

export default authorRoutes;