import { Book } from "./models/Book.model";
import { Request, Response } from "express";

class BookController {
    public static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const books = await Book.find().exec();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: Request, res: Response): Promise<void> {
        try {
            const book = await Book.findById(req.params.id).exec();
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const book = await Book.create(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default BookController;