import { Book } from "./models/Book.model";
import { UserRoles } from "../users/models/enum/userRoles.enum";
import { BOOK_ERROS, BOOK_STATUS } from "../../common/messages/errors/books";
import { NextFunction, Request, Response } from "express";
import { getSignedUrlFromS3, makeUploadToS3 } from "../../infra/aws/services/awsS3.service";
import getRandomName from "../../common/utils/getRandomName";

class BookController {
    public static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = Book.find();
            res.locals.context = Book;
            res.locals.query = query;
            next();
        } catch (error) {
            next(error);
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
            if (book.cover) {
                book.cover = await getSignedUrlFromS3(book.cover);
            }
            res.status(200).json(book);
        } catch (error: any) {
            res.status(BOOK_STATUS[error.message] ?? 500).json({ message: error.message});
        }
    }

    public static async create(req: any, res: Response) {
        try {
            const { role } = req.user ?? {};
            if (role !== UserRoles.ADMIN) {
                throw new Error("Permission denied");
            }
            if (req.file) {
                const randomName = getRandomName();
                await makeUploadToS3(randomName, req.file);
                req.body.cover = randomName;
            }
            const book = await Book.create(req.body);
            res.status(201).json(book);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public static async update(req: Request, res: Response) {
        try {
            res.status(200).json();
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default BookController;