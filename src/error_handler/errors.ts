import { v4 as generateUUID } from "uuid";
import { ApiErrorType, InvalidParam, BusinessErrorArgs } from "./types";
import { ValidateJsErrorFormat, invalidParamMapper, ExpressValidatorErrors } from "./invalid_param_mapper";

export class BaseError extends Error {
    public readonly id: string;

    public readonly status: number;

    public readonly type: ApiErrorType;

    public constructor(status: number, type: ApiErrorType, message: string | undefined, id = "") {
        super(message || "");
        this.id = id || generateUUID();
        this.type = type;
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
        Object.defineProperty(this, "id", {
            writable: false,
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            writable: false,
        });
        Object.defineProperty(this, "status", {
            enumerable: false,
            writable: false,
        });
        Object.defineProperty(this, "type", {
            writable: false,
        });
    }
}

export class AuthorizationError extends BaseError {
    public readonly errorCode: string;
    public constructor(message = "Unauthorized", id = "") {
        super(401, ApiErrorType.authorization, message, id);
        Object.defineProperty(this, "errorCode", {
            writable: false,
        });
    }
}

export class BusinessError extends BaseError {
    public readonly args: BusinessErrorArgs;
    public constructor(args: BusinessErrorArgs, id = "") {
        super(400, ApiErrorType.business, args.message, id);
        this.args = Object.assign(
            args.message === undefined ? null : { message: args.message },
            args.code === undefined ? null : { code: args.code },
        );
    }
}

export class TechnicalError extends BaseError {
    public constructor(message = "Internal Server Error", id = "", statusCode = 500) {
        super(statusCode, ApiErrorType.technical, message, id);
    }
}

export class ValidationError extends BaseError {
    public readonly invalidParams: InvalidParam[];

    private constructor(invalidParams: InvalidParam[], id = "") {
        super(400, ApiErrorType.validation, undefined, id);

        this.invalidParams = invalidParams;

        Object.defineProperty(this, "invalidParams", { writable: false });
        Object.defineProperty(this, "message", {
            enumerable: false,
            writable: false,
        });
    }

    public static from(
        {
            validateJsErrors,
            invalidParams,
            expressValidatorErrors,
        }: {
            validateJsErrors?: ValidateJsErrorFormat;
            invalidParams?: InvalidParam[];
            expressValidatorErrors?: ExpressValidatorErrors;
        },
        id = "",
    ): ValidationError {
        if (validateJsErrors) {
            return ValidationError.fromValidateJs(validateJsErrors, id);
        }
        if (invalidParams) {
            return ValidationError.fromInvalidParam(invalidParams, id);
        }
        if (expressValidatorErrors) {
            return ValidationError.fromExpressValidatorErrors(expressValidatorErrors, id);
        }

        return new ValidationError([]);
    }

    private static fromValidateJs(input: ValidateJsErrorFormat, id = ""): ValidationError {
        return new ValidationError(invalidParamMapper.fromValidateJSError(input), id);
    }

    private static fromInvalidParam(invalidParams: InvalidParam[], id = ""): ValidationError {
        return new ValidationError(invalidParams, id);
    }

    private static fromExpressValidatorErrors(validationErrors: ExpressValidatorErrors, id = ""): ValidationError {
        return new ValidationError(invalidParamMapper.fromExpressValidatorFormat(validationErrors), id);
    }
}
