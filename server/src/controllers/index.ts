import { Request, Response } from "express";
import { User, Session, Task } from "../models";

export const getUser = async ({ query }: Request, res: Response) => {
  try {
    const { email } = query;
    const user = await User.findOne({ email: email?.toString() }).populate({
      path: "sessions",
      populate: {
        path: "tasks",
        select: "-__v",
      },
    });
    if (!user) return res.status(404).json({ message: `user not found` });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const addUser = async ({ body }: Request, res: Response) => {
  try {
    const { email } = body;
    const newUser = await User.create({ email, sessions: [] });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

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
    await User.findByIdAndUpdate(userId, { $pull: { sessions: sessionId } }, {new: true});
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
