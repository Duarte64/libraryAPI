import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
});

export const Author = mongoose.model("Author", authorSchema);