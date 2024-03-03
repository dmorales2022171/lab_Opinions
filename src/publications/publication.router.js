import { Router } from "express";
import { check } from "express-validator";
import { publicationDelete, publicationGet, publicationPost, publicationPut } from "../publications/publication.controller.js";
import { validateFilds } from "../middlewares/validate-filds.js";
import { existPublicationById } from "../helpers/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    "/",
    [
        check("title", "The title field is required").not().isEmpty(),
        check("category", "The category field is required").not().isEmpty(),
        check("content", "The content field is required").not().isEmpty(),
        check("userName", "the author is required").not().isEmpty(),
        validateFilds
    ],
    publicationPost
);

router.put(
    "/:id",
    [   
        
        check("id", "the id is not valid").isMongoId(),
        check("id").custom(existPublicationById),
        validateFilds
    ],
    publicationPut
)

router.delete(
    '/:id',
    [
        validateJWT,
        check("id", "the id is not valid").isMongoId(),
        check("id").custom(existPublicationById),
        validateFilds
    ],
    publicationDelete
);

router.get(
    '/',
    [
        validateJWT
    ],
    publicationGet
)

export default router;
