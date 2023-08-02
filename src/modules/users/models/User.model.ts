import mongoose from "mongoose"
import { UserRoles } from "./enum/userRoles.enum";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        omitJSON: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum : UserRoles,
        required: true,
    }
})

userSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.password;
    },
  });

export const User = mongoose.model("User", userSchema)