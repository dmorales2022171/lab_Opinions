import { Router } from "express";
import { check } from "express-validator";
import { commentDelete, commentPost, commentPut } from "./comment.controller.js";
import { validateFilds } from '../middlewares/validate-filds.js'
import { validateJWT } from '../middlewares/validate-jwt.js';
import { existCommentById } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("content", "content is required").not().isEmpty(),
        validateFilds
    ],
    commentPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("content", "content is required").not().isEmpty(),
        validateFilds
    ],
    commentPut
)

router.delete(
    '/:id',
    [
        validateJWT,
        check("id", "the id is not valid").isMongoId(),
        check("id").custom(existCommentById),
        validateFilds
    ],
    commentDelete
);



export default router;