import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
import { BookingStatus } from "./enums/bookingStatus.enum";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        autopopulate: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
        autopopulate: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "PENDING",
        enum: BookingStatus,
    },
});

bookingSchema.plugin(autopopulate);

export const Booking = mongoose.model("Booking", bookingSchema);