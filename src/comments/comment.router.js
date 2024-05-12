import { Router } from "express";
import { check } from "express-validator";
import { commentDelete, commentGet, commentPost, commentPut } from "./comment.controller.js";
import { validateFilds } from '../middlewares/validate-filds.js'
import { existCommentById } from "../helpers/db-validators.js";

const router = Router();

router.post(
    "/",
    [
        check("content", "content is required").not().isEmpty(),
        validateFilds
    ],
    commentPost
);

router.put(
    "/:id",
    [
        check("content", "content is required").not().isEmpty(),
        validateFilds
    ],
    commentPut
)

router.delete(
    '/:id',
    [
        check("id", "the id is not valid").isMongoId(),
        check("id").custom(existCommentById),
        validateFilds
    ],
    commentDelete
);

router.get(
    "/",
    commentGet
)




export default router;