import { Result, ValidationError as ValidationErrorType } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AuthorizationError, BusinessError, ValidationError, TechnicalError } from "./errors";

export enum ApiErrorType {
    validation = "validation",
    technical = "technical",
    authorization = "authorization",
    business = "business",
}
export type InvalidParam = {
    name: string;
    reason: string;
};

export type BusinessErrorResponse = {
    id: string;
    type: ApiErrorType.business;
    code: string;
    message: string;
};

export type ValidationErrorResponse = {
    id: string;
    type: ApiErrorType.validation;
    invalidParams: InvalidParam[];
};

export type TechnicalErrorResponse = {
    id: string;
    type: ApiErrorType.technical;
    message: string;
};

export type AuthorizationErrorResponse = {
    id: string;
    type: ApiErrorType.authorization;
    message: string;
};

export type ApiErrorResponse =
    | BusinessErrorResponse
    | ValidationErrorResponse
    | TechnicalErrorResponse
    | AuthorizationErrorResponse;

export type ApiError = BusinessError | ValidationError | TechnicalError | AuthorizationError;

export type ErrorExtractor = (req: Request) => Result<ValidationErrorType>;

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export type ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void;
