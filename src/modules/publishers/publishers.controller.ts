import { Publisher } from "./models/Publisher.model";
import { Request, Response } from "express";

class PublisherController {
    public static async findAll(req: Request, res: Response) {
        try {
            const { name } = req.query;
            const params = name ? { name: new RegExp(name as string, "i") } : {};
            const publishers = await Publisher.find(params).exec();
            res.status(200).json(publishers);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: Request, res: Response) {
        try {
            const { _id } = req.params;
            const publisher = await Publisher.findById(_id).exec();
            if (!publisher) {
                return res.status(404).json({ message: "Publisher not found" });
            }
            res.status(200).json(publisher);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const publisher = await Publisher.create(req.body);
            res.status(201).json(publisher);
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