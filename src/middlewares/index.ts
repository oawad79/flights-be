import {Request, Response, NextFunction} from 'express';

export const validateQuery = (fields: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    for (const field of fields) {
        if (!req.query[field]) {
            return res.status(400).send(`${field} is missing`);
        }
    }
    next();
};

export const setDataSource = (source: string) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.setHeader('dataSource', source);
    res.setHeader('Access-Control-Expose-Headers', 'dataSource');
    next();
};