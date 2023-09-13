import express from "express";
import authController from "../controllers/auth.controller.js";
import { accountExistsSignup } from "../middlewares/auth/accountExistsSignup.middleware.js";
import { accountExistsSignin } from "../middlewares/auth/accountExistsSignin.middleware.js";
import { accountHasBeenVerified } from "../middlewares/auth/accountHasBeenVerified.middleware.js";
import { passwordIsOk } from "../middlewares/auth/passwordIsOk.middleware.js";
import passport from "../middlewares/passport.js";
import { validator } from "../middlewares/validator.js";
import { userSignIn, userSignUp } from "../schema/user.schema.js";

const router = express.Router();
const { signup, signin, googleSignIn, signout, token} = authController;

router.post('/signup', validator(userSignUp), accountExistsSignup, signup)
router.post('/signin', validator(userSignIn), accountExistsSignin, accountHasBeenVerified, passwordIsOk, signin)
router.post('/google', googleSignIn)
router.post('/signout', passport.authenticate("jwt", { session: false }), signout)
router.post('/token', passport.authenticate("jwt", { session: false }), token)

export default router;