import express, { Application, Request, Response, NextFunction } from "express";
import { connectDB } from "./database/db";
import { authRouter } from "./routes";
import { productRouter } from "./routes/product.route";
import { orderRouter } from "./routes/order.route";
import { seedService } from "./seed";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupRoutes(): void {
    this.app.use("/auth", authRouter);
    this.app.use("/product", productRouter);
    this.app.use("/order", orderRouter);
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupErrorHandling(): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
      }
    );
  }

  public async seedDatabase(): Promise<void> {
    try {
      await seedService.seed();
      console.log("Database seeded successfully.");
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  }

  public async start(): Promise<void> {
    try {
      await connectDB();
      this.app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
      });
    } catch (error) {
      console.error("Error starting server:", error);
    }
  }
}

export default App;
