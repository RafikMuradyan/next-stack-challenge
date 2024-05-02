import { IsArray, IsNotEmpty, Min, ValidateNested } from "class-validator";
import { OrderItemDto } from "./";

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  products!: OrderItemDto[];
}
