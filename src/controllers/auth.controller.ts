import { Request, Response } from "express";
import { Exception, JwtUtils } from "../utils";
import { CreateUserDto } from "../dtos";
import { authService } from "../services";

class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const userData: CreateUserDto = req.body;
      const newUser = await authService.register(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json({ message: error.message });
      }
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await authService.login(username, password);
      if (user) {
        const token = JwtUtils.generateUserToken(user);
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      if (error instanceof Exception) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const authController = new AuthController();
