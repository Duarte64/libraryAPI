import getRandomName from "../../common/utils/getRandomName";
import { Author } from "./models/Author.model";
import { Request, Response } from "express";
import { getSignedUrlFromS3, makeUploadToS3 } from "../../infra/aws/services/awsS3.service";
import { UserRoles } from "../users/models/enum/userRoles.enum";

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

    public static async create(req: any, res: Response) {
        try {
            const { role } = req.user ?? {};
            if (role !== UserRoles.ADMIN) {
                throw new Error("Permission denied");
            }
            if (req.file) {
                const randomName = getRandomName();
                await makeUploadToS3(randomName, req.file);
                req.body.profilePicture = randomName;
            }
            const author = await Author.create(req.body);
            res.status(201).json(author);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default AuthorController;