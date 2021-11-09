import { ApiErrorType, ApiError, ApiErrorResponse } from "./types";
import { AuthorizationError, BusinessError, ValidationError, TechnicalError } from "./errors";

export const deserializeError = (json: ApiErrorResponse): ApiError => {
    if (json.type === ApiErrorType.business) {
        return new BusinessError({ message: json.message }, json.id);
    }
    if (json.type === ApiErrorType.validation) {
        return ValidationError.from({ invalidParams: json.invalidParams }, json.id);
    }
    if (json.type === ApiErrorType.authorization) {
        return new AuthorizationError(json.message);
    }
    return new TechnicalError(json.message, json.id);
};

export const serializeError = (err: ApiError): any => {
    return Object.assign(
        { type: err.type },
        { id: err.id },
        err.message !== "" ? { message: err.message } : null,
        err.type === ApiErrorType.validation ? { invalidParams: (err as ValidationError).invalidParams } : null,
        err.type === ApiErrorType.business ? { ...(err as BusinessError).args } : null,
        err.type === ApiErrorType.authorization && (err as AuthorizationError).errorCode !== ""
            ? { errorCode: (err as AuthorizationError).errorCode }
            : null,
    );
};
