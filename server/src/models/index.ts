import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i;

//--------------INTERFACES----------------
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  photo: string;
  userAgent: [];
  isVerified: boolean;
  sessions: Array<ISession>;
}
interface ISession extends Document {
  tasks: Array<ITask>;
}
interface ITask extends Document {
  task: string;
  isDone: boolean;
}

//--------------USER SCHEMA/MODEL--------------
const userSchema: Schema = new Schema(
  {
    userName: { type: String, required: [true, "User name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [emailRegex, "Please enter a valid email"],
    },
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
    password: { type: String, required: [true, "please add a password"] },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

userSchema.pre<IUser>("save", async function (this, next) {
  if (this.isNew || this.isModified(`password`)) {
    const saltRounds = 10; //bcrypt option to set `cost factor`, higher the value longer the processing time
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);

//--------------SESSION SCHEMA/MODEL-------------
const sessionSchema: Schema = new Schema(
  {
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  {
    minimize: false,
  }
);
export const Session = mongoose.model<ISession>("Session", sessionSchema);

//---------------TASK SCHEMA/MODEL-------------------
const taskSchema: Schema = new Schema({
  task: String,
  isDone: { type: Boolean, default: false },
}, {minimize: false});

export const Task = mongoose.model<ITask>("Task", taskSchema);
