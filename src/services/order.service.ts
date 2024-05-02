import { CreateOrderDto } from "../dtos";
import { IPaginatedOrder } from "../interfaces";
import orderModel from "../models/order.model";
import Order, { Order as OrderType } from "../models/order.model";
import { Exception } from "../utils/exception";

import { ProductService } from "./product.service";

class OrderService {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public async create(orderData: CreateOrderDto): Promise<OrderType> {
    const populatedProducts = await Promise.all(
      orderData.products.map(async ({ productId, quantity }) => {
        const product = await this.productService.findOne(productId);
        if (quantity > product.stock) {
          throw new Exception({
            message: `Insufficient stock for following product: ${product.name}`,
            status: 400,
          });
        }

        return { product, quantity };
      })
    );
    const total = populatedProducts.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0
    );

    await Promise.all(
      populatedProducts.map((p) => {
        return this.productService.decrementStock(p.product._id, p.quantity);
      })
    );

    const productsToSave = populatedProducts.map((p) => {
      return { quantity: p.quantity, productId: p.product._id };
    });

    const createdOrder = await orderModel.create({
      products: productsToSave,
      total,
    });

    return createdOrder;
  }

  public async findAll(page: number, limit: number): Promise<IPaginatedOrder> {
    const count = await orderModel.countDocuments();
    const pages = Math.ceil(count / limit);

    const orders = await orderModel
      .find()
      .populate("products.productId")
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      orders,
      count,
      pages,
    };
  }

  public async findOne(id: string): Promise<OrderType> {
    const existingOrder = await Order.findById(id).exec();
    if (!existingOrder) {
      throw new Exception({
        message: "Order not found",
        status: 400,
      });
    }

    return existingOrder;
  }

  public async remove(id: string): Promise<boolean> {
    const existingOrder = await this.findOne(id);
    const deletedResponse = await orderModel
      .deleteOne(existingOrder._id)
      .exec();

    return !!deletedResponse.deletedCount;
  }

  public async ordersCount(): Promise<number> {
    const count = Order.countDocuments();
    return count;
  }
}

export const orderService = new OrderService();
