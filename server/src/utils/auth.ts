import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import "dotenv/config";

export const signToken = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );
};

export const authMiddleware = async (
  { user, cookies }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Not authorized, please log in to continue" });

    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const currentUser = await User.findById(id).select("-password");
    if (!currentUser)
      return res.status(400).json({ message: "user not found" });
    user = currentUser;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access, please log in" });
  }
  next();
};
