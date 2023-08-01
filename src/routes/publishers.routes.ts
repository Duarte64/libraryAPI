import { Router } from 'express';
import PublisherController from '../modules/publishers/publishers.controller';


const publisherRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Publishers
 *   description: Can manage all book publishers on the platform
 */
publisherRoutes.route('/')
    .get(PublisherController.findAll)
    .post(PublisherController.create)

publisherRoutes.route('/:_id')
    .get(PublisherController.findOne)
    .put()
    .delete()

export default publisherRoutes;