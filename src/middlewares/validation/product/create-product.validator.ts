import { validateOrReject } from "class-validator";
import { NextFunction } from "express";
import { CreateProductDto } from "../../../dtos";
import { Request, Response } from "express";

export const CreateProductValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      return res.status(404).send({ message: "Missing request body!" });
    }

    const product = new CreateProductDto();
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.stock = req.body.stock;

    await validateOrReject(product);

    next();
  } catch (error: any) {
    const message = Object.values(error);
    return res.status(400).send({ message });
  }
};
