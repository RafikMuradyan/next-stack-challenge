import express from "express";
import AuthMiddleware from "../middlewares/auth/auth.middleware";
import { productController } from "../controllers";
import {
  CreateProductValidator,
  ObjectIdValidation,
  UpdateProductValidator,
} from "../middlewares";

export const productRouter = express.Router();

productRouter.get("/", AuthMiddleware, productController.findAll);
productRouter.get(
  "/:id",
  AuthMiddleware,
  ObjectIdValidation,
  productController.findOneById
);
productRouter.post(
  "/",
  AuthMiddleware,
  CreateProductValidator,
  productController.create
);
productRouter.put(
  "/:id",
  AuthMiddleware,
  ObjectIdValidation,
  UpdateProductValidator,
  productController.update
);
productRouter.delete(
  "/:id",
  AuthMiddleware,
  ObjectIdValidation,
  productController.remove
);
