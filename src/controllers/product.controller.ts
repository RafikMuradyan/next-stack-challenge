import { Request, Response } from "express";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import { Exception } from "../utils";
import { productService } from "../services";

class ProductController {
  
  public async findAll(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;

      const products = await productService.findAll(page, limit);
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async findOneById(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const product = await productService.findOne(productId);

      return res.status(200).json(product);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const productDto: CreateProductDto = req.body;
      const product = await productService.create(productDto);
      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const productDto: UpdateProductDto = req.body;
      const updatedProduct = await productService.update(productId, productDto);

      return res.status(200).json(updatedProduct);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const productId = req.params.id;
      const isDeleted = await productService.remove(productId);
      
      return res.status(204).send(isDeleted);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json(error);
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const productController = new ProductController();
