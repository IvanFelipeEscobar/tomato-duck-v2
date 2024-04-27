import useTaskStore, { Task } from "../../lib/taskStore";
import { useState } from "react";

import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
// import { addNewTask, deleteOneTask, toggleTaskStatus } from "../../lib/api";
const TaskList = ({ sess }: { sess: number }) => {

  const [txt, setTxt] = useState<string>("");
  const taskStore = useTaskStore((state) => ({
    user: state.user,
    activeSession: state.activeSession,
    setUser: state.setUser,
    addSession: state.addSession,
    setActiveSession: state.setActiveSession,
    deleteSession: state.deleteSession,
    addTask: state.addTask,
    delTask: state.delTask,
    toggleTask: state.toggleTask,
  }));

  const handleAddTask = async () => {
    const sessionId = taskStore.activeSession;
    if (!sessionId) return; // No active session
    // if (isAuthenticated) {
    //   try {
    //     const res = await addNewTask(sessionId, txt
    //     );
    //     const newTaskAdded: Task = await res.json();
    //     taskStore.addTask(sessionId, newTaskAdded);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
      const task: Task = {
        _id: uuidv4(),
        task: txt,
        isDone: false,
      };
      taskStore.addTask(sessionId, task);
    // }
    setTxt("");
  };
  return (
    <>
      {taskStore.user.sessions[sess].tasks.length > 0 && (
        <span className="divider font-extralight tracking-tight text-sm italic">
          Click on a task to toggle status
        </span>
      )}

      {taskStore.user.sessions[sess].tasks.map((t, i) => (
        <div key={`task${i}`} className="flex items-center">
          <div>
            <button
              className="btn btn-circle bg-red-400 hover:bg-red-700 hover:skew-x-12 btn-xs"
              onClick={() => {
                // if(isAuthenticated){
                //   deleteOneTask(taskStore.user.sessions[sess]._id, t._id)
                // }
                taskStore.delTask(taskStore.user.sessions[sess]._id, t._id);
              }}
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
          <div
            className="flex justify-between bg-base-100 rounded-md shadow-md px-4 py-2 my-2 mx-4 w-full"
            onClick={() =>{
              // if(isAuthenticated){
              //   toggleTaskStatus(taskStore.user.sessions[sess]._id, t._id)
              // }
              taskStore.toggleTask(taskStore.user.sessions[sess]._id, t._id)}
            }
          >
            <span>{t.task}</span>
            <span>
              {t.isDone ? (
                <span className="text-green-700 flex items-center gap-4">
                  done
                  <FaCheckCircle color="green" />
                </span>
              ) : (
                <span className="text-red-700 flex items-center gap-4">
                  pending
                  <FaWindowClose color="red" />
                </span>
              )}
            </span>
          </div>
        </div>
      ))}
      <span className="divider font-extralight tracking-tight text-sm italic">
        Add new tasks below
      </span>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-sm rounded-full"
        onChange={(e) => setTxt(e.target.value)}
        value={txt}
      ></input>
      {txt.trim() === "" ? (
        <button className="btn btn-info btn-sm ml-4  rounded-full text-base-100">
          <FaRegPenToSquare />
          Add task
        </button>
      ) : (
        <button
          className="btn btn-info btn-sm ml-4  rounded-full text-base-100"
          onClick={handleAddTask}
        >
          <FaRegPenToSquare />
          Add task
        </button>
      )}
    </>
  );
};

export default TaskList;
