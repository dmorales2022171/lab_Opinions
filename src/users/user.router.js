import { Router } from "express";
import { check } from "express-validator";
import { userPost } from "./user.controller";
import { validateFilds } from "../middlewares/validate-filds";