import bcrypt from "bcrypt";
import UserModel, { User } from "../models/user.model";
import { CreateUserDto } from "../dtos";
import { Exception } from "../utils";

class AuthService {
  public async register(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const existingUser = await UserModel.findOne({ username: user.username });
    if (existingUser) {
      throw new Exception({
        status: 409,
        message: "User with this username already exist",
      });
    }
    const newUser = new UserModel({
      username: user.username,
      password: hashedPassword,
    });

    return newUser.save();
  }

  public async login(username: string, password: string): Promise<User | null> {
    const user = await UserModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  public async usersCount(): Promise<number> {
    const count = await UserModel.countDocuments();
    return count;
  }
}

export const authService = new AuthService();
