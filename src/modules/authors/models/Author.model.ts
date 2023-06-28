import mongoose, { Types } from "mongoose";

const authorSchema = new mongoose.Schema({
    id: {
        type: Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
});