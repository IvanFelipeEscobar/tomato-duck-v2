import { Request, Response } from "express";
import { User, Session, Task } from "../models";
import { signToken } from "../utils/auth";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const addUser = async ({ body }: Request, res: Response) => {
  try {
    const { userName, email, password } = body;
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
      sessions: [],
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

export const loginUser = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
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

export const logOutUser = async (req: Request, res: Response) => {
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
    const activeUser = await User.findById(_id, {
      path: "sessions",
      populate: {
        path: "tasks",
        select: "-__v",
      },
    });
    if (!user) res.status(404).json({ message: `user not found` });
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
    if(!editedUser) return res.status(404).json({message: 'user to be edited not found'});
    return res.status(201).json(editedUser)
  } catch (error) {
    res.status(500).json;
  }
};

export const loginStatus = async ({cookies}: Request, res: Response) => {
const {token }= cookies
if(!token) return res.json(false)
const verify = jwt.verify(token, process.env.JWT_SECRET!)
return verify ? res.json(true) :  res.json(false)
}

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
