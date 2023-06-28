import mongoose from "mongoose"

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const Publisher = mongoose.model("Publisher", publisherSchema)