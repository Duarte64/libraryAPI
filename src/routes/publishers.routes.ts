import { Router } from 'express';
import PublisherController from '../modules/publishers/publishers.controller';


const publisherRoutes = Router();

publisherRoutes.route('/')
    .get(PublisherController.findAll)
    .post(PublisherController.create)

publisherRoutes.route('/:_id')
    .all()
    .get()
    .put()
    .delete()

export default publisherRoutes;