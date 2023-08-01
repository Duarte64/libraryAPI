import mongoose from "mongoose";
import { getSignedUrlFromS3 } from "../../../infra/aws/services/awsS3.service";

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

authorSchema.post("find", async function (authors) {
    for (const author of authors) {
        if (author.profilePicture) {
            author.profilePicture = await getSignedUrlFromS3(author.profilePicture);
        }
    }
});

export const Author = mongoose.model("Author", authorSchema);