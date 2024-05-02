import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../../utils";
import { IUserPayload } from "../../interfaces";

interface AuthRequest extends Request {
  user?: IUserPayload;
}

export default function AuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decodedToken = JwtUtils.verifyUserToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decodedToken;

  next();
}
