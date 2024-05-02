import { CreateProductDto, UpdateProductDto } from "../dtos";
import productModel from "../models/product.model";
import Product, { Product as ProductType } from "../models/product.model";
import { Exception } from "../utils";
import { IPaginatedProduct } from "../interfaces";

export class ProductService {
  public async findAll(
    page: number,
    limit: number
  ): Promise<IPaginatedProduct> {
    const count = await Product.countDocuments();
    const pages = Math.ceil(count / limit);

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      products,
      count,
      pages,
    };
  }

  public async findOne(id: string): Promise<ProductType> {
    const existingProduct = await Product.findById(id).exec();
    if (!existingProduct) {
      throw new Exception({
        message: "Product not found",
        status: 404,
      });
    }

    return existingProduct;
  }

  public async create(product: CreateProductDto): Promise<ProductType> {
    const createdProduct = await productModel.create(product);
    return createdProduct;
  }

  public async update(
    id: string,
    product: UpdateProductDto
  ): Promise<ProductType> {
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      throw new Exception({
        message: "Product not found",
        status: 404,
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });

    if (!updatedProduct) {
      throw new Exception({
        message: "Product does not updated",
        status: 400,
      });
    }
    return updatedProduct;
  }

  public async remove(id: string): Promise<boolean> {
    const existingProduct = await this.findOne(id);
    const deletedResponse = await productModel
      .deleteOne(existingProduct._id)
      .exec();

    return !!deletedResponse.deletedCount;
  }

  public async decrementStock(id: string, quantity: number) {
    const existingProduct = await this.findOne(id);
    const updatedStock = existingProduct.stock - quantity;

    return productModel.findByIdAndUpdate(
      id,
      { stock: updatedStock },
      { new: true }
    );
  }

  public async productsCount(): Promise<number> {
    const count = await Product.countDocuments();
    return count;
  }
}

export const productService = new ProductService();
