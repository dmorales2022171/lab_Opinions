import { Router } from "express";
import { check } from "express-validator";
import {
    userDelete,
    userPost, 
    userPut
} from "./user.controller.js";
import {
    existsMail,
    existUserById,
    isRoleValid
} from "../helpers/db-validators.js";
import { validateFilds } from "../middlewares/validate-filds.js";
import { hasRole } from '../middlewares/validate-roles.js';

const router = Router();

router.post(
    "/",
    [
        check("userName", "The name is required").not().isEmpty(),
        check("password", "The password must be more than 6 characters.").isLength({min: 6}),
        check("mail", "it is  not a valid mail").isEmail(),
        check("mail").custom(existsMail),
        validateFilds,
    ],

    userPost
);

router.put(
    "/:id",
    [
        check("id", "it is not valid id").isMongoId(),
        check("id").custom(existUserById),
        validateFilds
    ],
    userPut
)



export default router;