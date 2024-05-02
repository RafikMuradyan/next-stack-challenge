import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class OrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  productId!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity!: number;
}
