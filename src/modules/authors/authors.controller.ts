import { Author } from "./models/Author.model";
import { Request, Response } from "express";


class AuthorController {
    public static async findAll(req: Request, res: Response) {
        try {
            const books = await Author.find().exec();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: Request, res: Response) {
        try {
            const { _id } = req.params;
            const book = await Author.findById(_id).exec();
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const book = await Author.create(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            res.status(200).json();
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async delete(req: Request, res: Response) {
        try {
            Author.deleteOne({ _id: req.params.id }).exec();
            res.status(200).json();
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default AuthorController;