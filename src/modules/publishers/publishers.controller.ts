import { Publisher } from "./models/Publisher.model";
import { Request, Response } from "express";


class PublisherController {
    public static async findAll(req: Request, res: Response) {
        try {
            const books = await Publisher.find().exec();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: Request, res: Response) {
        try {
            const { _id } = req.params;
            const book = await Publisher.findById(_id).exec();
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const book = await Publisher.create(req.body);
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
            Publisher.deleteOne({ _id: req.params.id }).exec();
            res.status(200).json();
        } catch (error) {
            res.status(500).json();
        }
    }
}

export default PublisherController;