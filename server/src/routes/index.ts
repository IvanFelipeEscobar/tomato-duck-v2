import express from "express";
import {
  addUser,
  getUser,
  addSession,
  addTask,
  deleteSession,
  toggleTaskStatus,
  deleteTask,
} from "../controllers";

const router = express.Router();

router.route("/api/user").get(getUser).post(addUser);
router.route("/api/user/:email").post(addUser);
router.route("/api/:userId/session").put(addSession);
router.route("/api/:userId/:sessionId").delete(deleteSession).put(addTask);
router.route("/api/:sessionId/:taskId").put(toggleTaskStatus).delete(deleteTask);

export default router;
