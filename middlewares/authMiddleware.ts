import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
import IJWTPayload from "../interfaces/IJWTPayload";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const tokenBearer = req.headers["authorization"]?.split(" ");
  const AUTH_TOKEN = tokenBearer![1];

  if (AUTH_TOKEN) {
    jwt.verify(
      AUTH_TOKEN,
      process.env.JWT_SECRET,
      (err: Error, data: IJWTPayload) => {
        if (err) {
          res.status(401);
          res.json({
            status: "error",
            message: "Invalid token",
          });
        } else {
          next();
        }
      }
    );
  } else {
    res.json({
      status: 401,
      message: "Unauthorized",
    });
  }
}

module.exports = authMiddleware;

export {};
