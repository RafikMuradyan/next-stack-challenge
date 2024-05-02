import {Product as ProductType} from "../../models/product.model";
import { IPagination } from "./pagination-interface";

export interface IPaginatedProduct extends IPagination{
  products: Array<ProductType>
}