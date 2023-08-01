import bcrypt from "bcryptjs";
import { User } from "./models/User.model";
import { Request, Response } from "express";
import mongoose from "mongoose";

class UserController {
    public static async findOne(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params._id).exec();
            if (!user) {
                throw new Error("User not found");
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            const deleteId = new mongoose.Types.ObjectId(req.params._id);
            const user = await User.deleteOne({ _id: deleteId }).exec();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default UserController;