import { Request, Response } from "express";
import { orderService } from "../services";
import { Exception } from "../utils";
import { CreateOrderDto } from "../dtos";

export class OrderController {
  public async findAll(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;

      const orders = await orderService.findAll(page, limit);
      return res.status(200).json(orders);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async findOneById(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const order = await orderService.findOne(orderId);

      return res.status(200).json(order);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const isDeleted = await orderService.remove(orderId);
      return res.status(204).send(isDeleted);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const orderDto: CreateOrderDto = req.body;
      const order = await orderService.create(orderDto);
      return res.status(201).json(order);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const orderController = new OrderController();