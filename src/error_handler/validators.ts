import { securityHeaderValidator, TechnicalError, ValidationError } from "./index";
import { validationResult, ValidationChain } from "express-validator";
import { RequestHandler } from "express";

export const validateRequest = (validations: ValidationChain[]): RequestHandler => {
    return async (req, res, next): Promise<void> => {
        try {
            securityHeaderValidator(req);
        } catch (error) {
            return next(new TechnicalError(error, null, 400));
        }

        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return next(ValidationError.from({ expressValidatorErrors: errors.array() }));
    };
};
