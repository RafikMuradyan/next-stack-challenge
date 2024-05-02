import express from "express";
import AuthMiddleware from "../middlewares/auth/auth.middleware";
import { ObjectIdValidation } from "../middlewares";
import { CreateOrderValidator } from "../middlewares/validation/order/create-order.validator";
import { orderController } from "../controllers";

export const orderRouter = express.Router();

orderRouter.get("/", AuthMiddleware, orderController.findAll);
orderRouter.get(
  "/:id",
  AuthMiddleware,
  ObjectIdValidation,
  orderController.findOneById
);
orderRouter.post(
  "/",
  AuthMiddleware,
  CreateOrderValidator,
  orderController.create
);
orderRouter.delete(
  "/:id",
  AuthMiddleware,
  ObjectIdValidation,
  orderController.delete
);
