import { validateOrReject } from "class-validator";
import { NextFunction } from "express";
import { CreateOrderDto } from "../../../dtos";
import { Request, Response } from "express";

export const CreateOrderValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      return res.status(404).send({ message: "Missing request body!" });
    }

    const order = new CreateOrderDto();
    order.products = req.body.products;

    await validateOrReject(order);

    next();
  } catch (error: any) {
    const message = Object.values(error);
    return res.status(400).send({ message });
  }
};
