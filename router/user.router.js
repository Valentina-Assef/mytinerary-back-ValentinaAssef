import express from "express";
import userController from "../controllers/user.controller.js"
import { validator } from "../middlewares/validator.js"
import { createUserSchema } from "../schema/user.schema.js";

const router = express.Router();
const {getUsers, createUser} = userController;

router.get('/', getUsers);
router.post('/', validator(createUserSchema), createUser);

export default router;