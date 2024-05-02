import { validateOrReject } from "class-validator";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { CreateUserDto } from "../../../dtos";

export const LoginUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    const user = new CreateUserDto();
    user.username = req.body.username;
    user.password = req.body.password;

    await validateOrReject(user);

    next();
  } catch (error: any) {
    const message = Object.values(error);
    return res.status(400).send({ message });
  }
};
