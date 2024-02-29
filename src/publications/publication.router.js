import { Router } from "express";
import { check } from "express-validator";
import { publicationPost } from "../publications/publication.controller.js";
import { validateFilds } from "../middlewares/validate-filds.js";

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
);

export default router;
