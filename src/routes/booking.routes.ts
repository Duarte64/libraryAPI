import { Router } from "express";
import BookingController from "../modules/booking/booking.controller";
import { authenticateJwt } from "../modules/auth/middleware/jtwAuth.middleware";

const bookingRoutes = Router();

bookingRoutes.get('/', authenticateJwt, BookingController.findAll)
bookingRoutes.get('/:_id', authenticateJwt, BookingController.findOne)
bookingRoutes.post('/refund', BookingController.refund);
bookingRoutes.post('/reservation', authenticateJwt, BookingController.reservation);

export default bookingRoutes;