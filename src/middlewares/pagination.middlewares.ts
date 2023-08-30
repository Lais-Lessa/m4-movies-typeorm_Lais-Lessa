import { NextFunction, Request, Response } from "express";


export const pagination = (req: Request, res: Response, next: NextFunction): void => {

    const queryPage = Number(req.query.page);
    
    const queryPerPage = Number(req.query.perPage);

    const page: number = queryPage && !isNaN(queryPage) && queryPage > 1 ? queryPage : 1;

    const perPage: number = queryPerPage && !isNaN(queryPerPage) && queryPerPage <= 5 && queryPerPage > 0 ? queryPerPage : 5;

    const baseUrl: string = 'http://localhost:3000/movies';

    let prevPage: string = '';
    if (page > 1) {
        prevPage = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
    }

    const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

    const querySort: any = req.query.sort;
    const queryOrder: any = req.query.order;

    const orderOpts: Array<string> = ['asc', 'desc'];
    const sortOpts: Array<string> = ['price'];

    let sort: string;
    let order: string;

    if (!(querySort && sortOpts.includes(querySort))) {
        sort = 'id';
    } else {
        sort = querySort;
    }

    if (!(querySort && orderOpts.includes(queryOrder))) {
        order = 'asc';
    } else {
        order = queryOrder;
    }

    const paginationObj = {
        page,
        perPage,
        order,
        sort,
        prevPage: page > 1 ? prevPage : null,
        nextPage: nextPage,
    };

    res.locals.paginationObj = paginationObj;

    return next();
};
