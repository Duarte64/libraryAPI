import paginate from '../middlewares/pagination/paginate.middleware';
import PublisherController from '../modules/publishers/publishers.controller';
import { Router } from 'express';
import { authenticateJwt } from '../modules/auth/middleware/jtwAuth.middleware';


const publisherRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Publishers
 *   description: Can manage all book publishers on the platform
 */
publisherRoutes.route('/')
    .get(PublisherController.findAll, paginate)
    .post(authenticateJwt, PublisherController.create)

publisherRoutes.route('/:_id')
    .get(PublisherController.findOne)

export default publisherRoutes;