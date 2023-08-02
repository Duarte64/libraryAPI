import _ from 'lodash';
import { Book } from "../books/models/Book.model";
import { Booking } from "./models/Booking.model";
import { UserRoles } from "../users/models/enum/userRoles.enum";
import { BookStatus } from "../../common/enums/bookStatus.enum";
import { BookingStatus } from "./models/enums/bookingStatus.enum";
import { Request, Response } from "express";

class BookingController {
    public static async findAll(req: any, res: Response) {
        try {
            const { role } = req.user ?? {};
            const book = req.query.book ?? null;
            let user = req.query.user ?? null;
            if (role === UserRoles.STUDENT) {
                user = req.user._id;
            }
            const params = book ? { book } : user ? { user } : {};
            const bookings = await Booking.find(params).exec();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: any, res: Response) {
        try {
            const { _id } = req.params;
            const booking = await Booking.findById(_id).exec();
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            if (booking.user._id !== req.user._id && req.user.role === UserRoles.STUDENT) {
                return res.status(403).json({ message: "Permission denied" });
            }
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json();
        }
    }

    static async reservation(req: any, res: Response) {
        const { book, user, checkIn, checkOut } = req.body;
        try {
            const { role } = req.user ?? {};
            if (role !== UserRoles.STUDENT) {
                throw new Error("Permission denied, only students can book");
            }
            const previousBooking = await Booking.findOne({ book, user }).exec();
            if (!_.isEmpty(previousBooking) && previousBooking?.status !== BookingStatus.COMPLETED) throw new Error("You already have a booking for this book, please return first");
            const libraryBook = await Book.findById(book).exec();
            if (!libraryBook) throw new Error("Book not found");
            if (libraryBook.quantity < 1) throw new Error("Book is out of stock");
            libraryBook.quantity -= 1;
            if (libraryBook.quantity === 0) libraryBook.status = BookStatus.INACTIVE;
            await libraryBook.save();
            const booking = await Booking.create({ book, user, checkIn, checkOut, status: BookingStatus.PENDING });
            res.status(201).json(booking);
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async refund(req: Request, res: Response) {
        const { book, user } = req.body;
        try {
            const booking = await Booking.findOne({ book, user, status: BookingStatus.PENDING }).exec();
            if (!booking) throw new Error("Booking not found");
            const libraryBook = await Book.findById(book).exec();
            if (!libraryBook) throw new Error("Book not found");
            libraryBook.quantity += 1;
            if (libraryBook.quantity > 0) libraryBook.status = BookStatus.ACTIVE;
            await libraryBook.save();
            booking.status = BookingStatus.COMPLETED;
            const updatedBooking = await booking.save();
            res.status(200).json(updatedBooking);
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default BookingController;