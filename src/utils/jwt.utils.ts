import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { IUserPayload } from "../interfaces";

export class JwtUtils {
  private static readonly secretKey: string = "secret_key";

  public static generateUserToken(user: User): string {
    const userPayload: IUserPayload = {
      userId: user._id,
      username: user.username,
    };
    return jwt.sign(userPayload, JwtUtils.secretKey, { expiresIn: "1d" });
  }

  public static verifyUserToken(token: string): IUserPayload | null {
    try {
      const decodedToken = jwt.verify(
        token,
        JwtUtils.secretKey
      ) as IUserPayload;
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}
