import express from "express";
import { RegisterUserValidator } from "../middlewares";
import { LoginUserValidator } from "../middlewares";
import { authController } from "../controllers";

export const authRouter = express.Router();

authRouter.post("/login", LoginUserValidator, authController.login);
authRouter.post("/register", RegisterUserValidator, authController.register);
