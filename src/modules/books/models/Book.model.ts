import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    cover: {
        type: String,
        required: false,
    },
    pages: {
        type: Number,
        required: false,
    },
    year: {
        type: Number,
        required: false,
    },
    language: {
        type: String,
        required: false,
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: "Publisher",
        required: false,
    },
    quantity: {
        type: Number,
        required: false,
    },
});

export const Book = mongoose.model("Book", bookSchema);