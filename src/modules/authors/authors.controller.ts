import { getSignedUrlFromS3, makeUploadToS3 } from "../../infra/aws/services/awsS3.service";
import getRandomName from "../../common/utils/getRandomName";
import { Author } from "./models/Author.model";
import { Request, Response } from "express";

class AuthorController {
    public static async findAll(req: Request, res: Response) {
        try {
            const { name } = req.query;
            const params = name ? { name: new RegExp(name as string, "i") } : {};
            const authors = await Author.find(params).exec();
            for (const author of authors) {
                if (author.profilePicture) {
                    author.profilePicture = await getSignedUrlFromS3(author.profilePicture);
                }
            }
            res.status(200).json(authors);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async findOne(req: Request, res: Response) {
        try {
            const { _id } = req.params;
            const author = await Author.findById(_id).exec();
            if (!author) {
                throw new Error("Author not found");
            }
            if (author.profilePicture) {
                author.profilePicture = await getSignedUrlFromS3(author.profilePicture);
            }
            res.status(200).json(author);
        } catch (error) {
            res.status(500).json();
        }
    }

    public static async create(req: Request, res: Response) {
        try {
            const randomName = getRandomName();
            await makeUploadToS3(randomName, req.file);
            req.body.profilePicture = randomName;
            const author = await Author.create(req.body);
            res.status(201).json(author);
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