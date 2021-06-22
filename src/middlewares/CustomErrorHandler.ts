import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import {Service} from "typedi";
import {NextFunction, Request, Response} from "express";
import Logger from '../loaders/logger';

//for this handler to get picked up, you will have to set the
//defaultErrorHandler: false
@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    isProduction = process.env.NODE_ENV == 'production'

    error(error: any, request: Request, response: Response, next: NextFunction) {
        // It seems like some decorators handle setting the response (i.e. class-validators)
        if (!response.headersSent) {
            response.status(error.httpCode || 500);

            response.json({
                name: error.name,
                message: error.message,
                errors: error['errors'] || [],
            });

        }

        if (this.isProduction) {
            Logger.error(error.name, error.message);
        } else {
            Logger.error(error.name, error.stack);
        }
    }
}