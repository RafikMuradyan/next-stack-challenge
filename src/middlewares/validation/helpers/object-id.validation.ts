import { NextFunction } from "express";
import { Request, Response } from "express";
import { Types } from "mongoose";

const { ObjectId } = Types;

export const ObjectIdValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params || !Object.keys(req.params).length) {
      return res.status(400).send({ message: "Missing request params!" });
    }

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ message: "Invalid id provided" });
    }
    next();
  } catch (error: any) {
    const message = Object.values(error);
    return res.status(400).send({ message });
  }
};
