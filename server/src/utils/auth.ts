import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import crypto from "crypto";
import "dotenv/config";

export const signToken = (id: string) => {
  return jwt.sign(
    {
      _id: id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res
        .status(401)
        .json({ message: "Not authorized, please log in to continue" });

    const { _id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const currentUser = await User.findById(_id).select("-password");
    if (!currentUser)
      return res.status(400).json({ message: "user not found" });
    req.user = currentUser
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access, please log in" });
  }
};

export const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex')
