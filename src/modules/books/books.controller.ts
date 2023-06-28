import { Book } from "./models/Book.model";
import { Request, Response } from "express";
import { BOOK_ERROS, BOOK_STATUS } from "../../common/messages/errors/books";

class BookController {
    public static async findAll(req: Request, res: Response) {
        try {
            const books = await Book
                .find()
                .populate("publisher")
                .populate("author")
                .exec();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: Request, res: Response) {
        try {
            const { _id } = req.params;
            const book = await Book
                .findById(_id)
                .populate("publisher")
                .populate("author")
                .exec();
            if (!book) {
                throw new Error(BOOK_ERROS.BOOK_NOT_FOUND);
            }
            res.status(200).json(book);
        } catch (error: any) {
            res.status(BOOK_STATUS[error.message] ?? 500).json({ message: error.message});
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const book = await Book.create(req.body);
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
            Book.deleteOne({ _id: req.params.id }).exec();
            res.status(200).json();
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default BookController;