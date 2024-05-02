import { Order as OrderType } from "../../models/order.model";
import { IPagination } from "./pagination-interface";

export interface IPaginatedOrder extends IPagination{
  orders: Array<OrderType>;
}
