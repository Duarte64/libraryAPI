import { UserRoles } from "../users/models/enum/userRoles.enum";
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

    public static async create(req: any, res: Response) {
        try {
            const { role } = req.user ?? {};
            if (role !== UserRoles.ADMIN) {
                throw new Error("Permission denied");
            }
            const publisher = await Publisher.create(req.body);
            res.status(201).json(publisher);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default PublisherController;