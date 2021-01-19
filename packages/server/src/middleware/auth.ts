import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export default function (req: Request, res: Response, next: NextFunction) {
  const header = req.header("Authorization");
  const token = header?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.app.set("user", decoded);
    return next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
}
