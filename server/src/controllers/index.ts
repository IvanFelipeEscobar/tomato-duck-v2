import { Request, Response } from "express";
import { User, Session, Task } from "../models";
import { hashToken, signToken } from "../utils/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import sendEmail from "../utils/sendEmail";
import { Token } from "../models/token";
import crypto from "crypto";
import { populate } from "dotenv";
import { model } from "mongoose";
// --------------USER CONTROLLERS ----------
export const addUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    if (!email || !password || !userName)
      return res
        .status(400)
        .json({ message: "Please fill out all required fields" });
    if (password.length < 6)
      return res.status(400).json({
        message: "Password must be atleast 6 characters long, please try again",
      });
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({
        message:
          "Account with this email already exists, please log in to your account",
      });

    const newUser = await User.create({
      userName,
      email,
      password,
      sessions: []
    });
    if (!newUser)
      return res
        .status(400)
        .json({ message: "invalid input data, please try again" });
    const token = signToken(newUser._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "email & password rquired, please try again" });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message:
          "Could not find a user with that email, please verify or create an account if this is your first time here",
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword)
      return res
        .status(400)
        .json({ message: "Invalid email or password, please try again" });
    const token = signToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const logOutUser = async (_: Request, res: Response) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout succesful" });
};

export const getUser = async ({ user }: Request, res: Response) => {
  try {
    const { _id } = user;
    const activeUser = await User.findById(_id).populate({
      path: "sessions",
      populate: {
        path: "tasks",
      },
    });
    if (!activeUser) return res.status(404).json({ message: `user not found` });
    return res.status(200).json(activeUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const editUser = async ({ user, body }: Request, res: Response) => {
  try {
    const { _id } = user;
    const editedUser = await User.findByIdAndUpdate(
      _id,
      {
        body,
      },
      {
        new: true,
      }
    );
    if (!editedUser)
      return res.status(404).json({ message: "user to be edited not found" });
    return res.status(201).json(editedUser);
  } catch (error) {
    res.status(500).json;
  }
};

export const loginStatus = async ({ cookies }: Request, res: Response) => {
  const { token } = cookies;
  if (!token) return res.json(false);
  const verify = jwt.verify(token, process.env.JWT_SECRET!);
  return verify ? res.json(true) : res.json(false);
};

export const verifyUser = async ({ params }: Request, res: Response) => {
  const { verificationToken } = params;
  const hashedToken = hashToken(verificationToken);
  try {
    const userToken = await Token.findOne({
      vToken: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
    if (!userToken)
      return res.status(404).json({ message: "invalid or expired token" });
    const user = await User.findById(userToken.userId);
    if (!user) return res.status(404).json({ message: "user not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User is already verified" });
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Account verification succesful! Please log in to continue" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};


export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;
    const hashedToken = hashToken(resetToken);
    const userToken = await Token.findOne({
      rToken: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
    if (!userToken)
      return res.status(404).json({ message: "Tokens is invalid or expired" });
    const user = await User.findById(userToken.userId);
    if (!user) return res.status(404).json({ message: "user not found" });
    user.password = password;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset was succesful, please log in" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "user not found" });
    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json({ message: "Please enter both old and new passwords" });
    const validatePassword = await bcrypt.compare(oldPassword, user.password);
    if (validatePassword) {
      user.password = newPassword;
      await user.save();
      return res.status(200).json({
        message:
          "Password reset was succesful, please log in again with your new credentials",
      });
    } else {
      return res.status(400).json({ message: "Old password is incorrect" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
//------------EMAIL STUFF-------------------

export const sendVerifyEmail = async (req: Request, res: Response) => {
  try {
    const verUser = await User.findById(req.user._id);
    if (!verUser) return res.status(404).json({ message: "user not found" });
    if (verUser.isVerified)
      return res.status(400).json({ message: "User already verified" });
    let token = await Token.findOne({ userId: verUser._id });
    if (token) await token.deleteOne();
    const verificationToken = crypto.randomBytes(32).toString("hex") + req.user._id;
    const hashedToken = hashToken(verificationToken);
    await new Token({
      userId: req.user._id,
      vToken: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * 60 * 1000,
    }).save();

    const verificationUrl = `http://localhost:5173/user/verify/${verificationToken}`;
    const subject = "Tomato-Duck: Verify your account";
    const send_to = req.user.email;
    const send_from = process.env.EMAIL_USER!;
    const reply_to = "noreply@tomato.duck";
    const template = "verifyEmail";
    const name = req.user.userName;
    const link = verificationUrl;
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    return res.status(200).json({ message: "Account verification email sent" });
  } catch (error) {
    res.status(500).json({message: 'Email not sent, something went wrong'})
  }
};
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne( {email} );
    if (!user)
      return res
        .status(404)
        .json({ message: "no user associated with this email" });
    let token = await Token.findOne({ userId: user._id });
    if (token) return await token.deleteOne();
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    const hashedToken = hashToken(resetToken);
    await new Token({
      userId: user._id,
      rToken: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60 * 60 * 1000,
    }).save();
    const resetUrl = `http://localhost:5173/user/resetpassword/${resetToken}`;
    const subject = "Tomato-Duck: Reset your password";
    const send_to = user.email;
    const send_from = process.env.EMAIL_USER!;
    const reply_to = "noreply@tomato.duck";
    const template = "forgotPassword";
    const name = user.userName;
    const link = resetUrl;
    await sendEmail(
      subject,
      send_to,
      send_from,
      reply_to,
      template,
      name,
      link
    );
    return res
      .status(200)
      .json({ message: "Password reset, email has been sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};
// ----------- TASK STUFF --------------------
export const addSession = async ({ params }: Request, res: Response) => {
  try {
    const { userId } = params;
    const newSession = await Session.create({ tasks: [] });
    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { sessions: newSession._id },
      },
      {
        new: true,
      }
    );
    return res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const deleteSession = async ({ params }: Request, res: Response) => {
  try {
    const { userId, sessionId } = params;
    await Session.findByIdAndDelete(sessionId);
    await User.findByIdAndUpdate(
      userId,
      { $pull: { sessions: sessionId } },
      { new: true }
    );
    return res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const addTask = async ({ body, params }: Request, res: Response) => {
  try {
    const { sessionId } = params;
    const { task } = body;
    const newTask = await Task.create({ task, isDone: false });
    await Session.findByIdAndUpdate(
      sessionId,
      { $addToSet: { tasks: newTask._id } },
      { new: true }
    );
    return res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const toggleTaskStatus = async ({ params }: Request, res: Response) => {
  try {
    const { taskId } = params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "task not found" });
    task.isDone = !task?.isDone;
    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const deleteTask = async ({ params }: Request, res: Response) => {
  try {
    const { sessionId, taskId } = params;
    await Task.findByIdAndDelete(taskId);
    await Session.findByIdAndUpdate(sessionId, { $pull: { tasks: taskId } });
    return res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
