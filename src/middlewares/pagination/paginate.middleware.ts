import { NextFunction, Request, Response } from "express";

async function paginate(req: Request, res: Response, next: NextFunction) {
    try {
        let { limit = 10, page = 1, sortBy = "title", order = "ASC" } = req.query;

        limit = +limit;
        page = +page;
        sortBy = sortBy.toString();
        order = order.toString();

        if (+limit < 1 || +page < 1) {
            throw new Error("Invalid query params");
        }

        const totalItems = await res.locals.context.countDocuments().exec();
        const results = await res.locals.query
            .sort({[sortBy]: order === "ASC" ? 1 : -1 }) 
            .skip((+page - 1) * +limit)
            .limit(+limit)
            .exec();

        res.header("X-Total-Pages", Math.ceil(totalItems / +limit).toString());
        res.header("X-Current-Page", page.toString());
        res.header("X-Per-Page", limit.toString());
        res.locals.results = results;
        
        res.status(200).json({
            totalItems,
            totalPages: Math.ceil(totalItems / +limit),
            currentPage: page,
            perPage: limit,
            results
        });
    } catch (error) {
        res.status(500).json();
    }
}

export default paginate;