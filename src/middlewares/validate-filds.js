import { validationResult } from "express-validator";

export const validateFilds = (res, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json(error);
    }
    next();
}