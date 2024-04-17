import mongoose, { Schema, Document } from 'mongoose'

//--------------INTERFACES----------------
interface IUser extends Document {
    email: string
    session: Array<ISession>
}
interface ISession extends Document {
    tasks: Array<ITask>
    created: Date
}
interface ITask  extends Document {
    task: string;
    isDone: boolean;
}

//--------------USER SCHEMA/MODEL--------------
 const userSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    session: [{
        type: Schema.Types.ObjectId, ref: 'Session', 
    }]
 })
 export const User = mongoose.model<IUser>('User', userSchema)

 //--------------SESSION SCHEMA/MODEL-------------
 const sessionSchema: Schema = new Schema({
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    created: {
        type: Date,
        default: Date.now
    }
 })

 export const Session = mongoose.model<ISession>('Session', sessionSchema)

 //---------------TASK SCHEMA/MODEL-------------------
 const taskSchema: Schema = new Schema({
    task: String,
    isDone: {type: Boolean, default: false}
 })

 export const Task =  mongoose.model<ITask>('Task', taskSchema)