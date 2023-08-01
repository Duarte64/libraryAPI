import { NextFunction, Request, Response } from "express"

export const errorsHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorPath = req.path;
    res.status(500).json({ message: "Something went wrong" });
};

export default errorsHandler;