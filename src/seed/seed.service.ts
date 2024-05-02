import { authService, productService, orderService } from "../services";
import { mockUsers, mockProducts } from "./mock-data";

class SeedService {
  public async seed() {
    await this.seedUsers();
    await this.seedProducts();
    await this.seedOrders();
  }

  private async seedUsers() {
    const usersCount = await authService.usersCount();
    if (!usersCount) {
      for (const user of mockUsers) {
        await authService.register(user);
      }
      console.info(
        "\x1b[36m%s\x1b[0m",
        "info: Users seeded successfully."
      );
    } else {
      console.info(
        "\x1b[36m%s\x1b[0m",
        "info: Users already exist in the database. Skipping user seeding."
      );
    }
  }

  private async seedProducts() {
    const productsCount = await productService.productsCount();
    if (!productsCount) {
      for (const product of mockProducts) {
        await productService.create(product);
      }
      console.info("\x1b[36m%s\x1b[0m", "info: Products seeded successfully.");
    } else {
      console.info(
        "\x1b[36m%s\x1b[0m",
        "info: Products already exist in the database. Skipping product seeding."
      );
    }
  }

  private async seedOrders() {
    const ordersCount = await orderService.ordersCount();
    if (!ordersCount) {
      const productData = await productService.findAll(1, 5);
      for (const product of productData.products) {
        await orderService.create({
          products: [
            {
              productId: product._id,
              quantity: Math.floor(Math.random() * 3) + 1,
            },
          ],
        });
      }
      console.info("\x1b[36m%s\x1b[0m", "info: Orders seeded successfully.");
    } else {
      console.info(
        "\x1b[36m%s\x1b[0m",
        "info: Orders already exist in the database. Skipping orders seeding."
      );
    }
  }
}

export const seedService = new SeedService();
