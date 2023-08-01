import autopopulate from "mongoose-autopopulate";
import mongoose, { Schema } from "mongoose";
import { BookStatus } from "../../../common/enums/bookStatus.enum";
import { getSignedUrlFromS3 } from "../../../infra/aws/services/awsS3.service";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: false,
        autopopulate: true 
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
        min: [0, 'Pages must be greater than 0'],
        max: [5000, 'Pages must be less than 5000'],
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
        autopopulate: true
    },
    quantity: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        required: true,
        default: BookStatus.ACTIVE,
        enum: Object.values(BookStatus),
    }
});

bookSchema.post("find", async function (docs) {
    for (const doc of docs) {
        if (doc.cover) {
            doc.cover = await getSignedUrlFromS3(doc.cover);
        }
    }
});

bookSchema.plugin(autopopulate);

export const Book = mongoose.model("Book", bookSchema);
