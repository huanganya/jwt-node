import { ApiError, ErrorMiddleware, Middleware } from "./types";
import { Request, Response, NextFunction } from "express";
import { TechnicalError } from "./errors";
import { serializeError } from "./serializer";

export const notFoundMiddleware: Middleware = (req, res, next) => {
    res.status(404).send({ message: "not found" });
};

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    next: NextFunction,
): void => {
    /* eslint-disable @typescript-eslint/no-use-before-define */
    const apiError: ApiError = isUnknownError(err) ? new TechnicalError() : (err as ApiError);
    res.status(apiError.status);
    res.json(serializeError(apiError));
};

const isUnknownError = (err: Error): boolean => {
    const status = (err as ApiError).status || 501;
    return status > 500;
};

export const errorHandlerMiddleware = (): Array<Middleware | ErrorMiddleware> => {
    const middlewares: Array<Middleware | ErrorMiddleware> = [];
    middlewares.push(notFoundMiddleware);
    middlewares.push(errorHandler);
    return middlewares;
};
