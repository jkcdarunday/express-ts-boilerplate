import { NextFunction, Request, Response } from 'express';
import logger from './logger.ts';

export class ErrorResponse extends Error {
    logMessage?: string;
    statusCode: number;
    body: Record<string, any>;

    constructor(message: string, statusCode = 500, logMessage?: string, body = {}) {
        super(message);
        this.statusCode = statusCode;
        this.logMessage = logMessage;
        this.body = { message, ...body };
    }
}

export class AppResponse {
    statusCode: number;
    body: Record<string, any>;

    constructor (statusCode = 200, body = {}) {
        this.statusCode = statusCode;
        this.body = body;
    }
}

function handleResult(res: Response) {
    return (result: any) => {
        if (result instanceof AppResponse) {
            return res.status(result.statusCode).send(result.body)
        }

        res.send(result)
    }
}

export function handleErrors(middleware: (req: Request) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        middleware(req)
            .then(handleResult(res))
            .catch(next)
    }
}

export default function errorHandler(error: any, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof ErrorResponse) {
        if (error.logMessage) {
            logger.error(error.logMessage);
        }

        res.status(error.statusCode).send(error.body);

        return;
    }

    logger.error("Unhandled error", error);

    res.status(500).send({ message: "Internal server error" });
}
