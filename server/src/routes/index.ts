import express from "express";
import {
  addUser,
  getUser,
  addSession,
  addTask,
  deleteSession,
  toggleTaskStatus,
  deleteTask,
  loginUser, logOutUser,
  editUser,
  loginStatus,
  sendVerifyEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword
} from "../controllers";
import chatSubmit from '../controllers/chat-bot'
import chatLimiter from "../utils/chatBotLimiter";
import { authMiddleware } from "../utils/auth";
const router = express.Router();

router.route("/api/user").post(addUser).get(authMiddleware, getUser).put(authMiddleware, editUser)
router.route('/api/login').post(loginUser).get(loginStatus)
router.route('/api/logout').get(logOutUser)

router.route('/api/sendVerifyEmail').post(authMiddleware, sendVerifyEmail)
router.route('/api/verify/:verificationToken').put(verifyUser)
router.route('/api/forgotpassword').post(forgotPassword)
router.route('/api/resetpassword/:resetToken').put(resetPassword)
router.route('/api/changepassword').put(authMiddleware ,changePassword)



router.route("/api/:userId/session").put(addSession);
router.route("/api/:userId/:sessionId").delete(deleteSession)
router.route('/api/:sessionId').put(addTask)
router.route("/api/:sessionId/:taskId").put(toggleTaskStatus).delete(deleteTask);
router.route('/api/chatbot').post(chatLimiter, chatSubmit)
export default router;
