import useTaskStore, { Task } from "../../lib/taskStore";
import { useState } from "react";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
const TaskList = ({ sess }: { sess: string }) => {
  const [txt, setTxt] = useState<string>("");
  const taskStore = useTaskStore((state) => ({
    user: state.user,
    sessions: state.sessions,
    activeSession: state.activeSession,
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    setUser: state.setUser,
    addSession: state.addSession,
    setActiveSession: state.setActiveSession,
    deleteSession: state.deleteSession,
    addTask: state.addTask,
    delTask: state.delTask,
    toggleTask: state.toggleTask,
    setLoading: state.setLoading,
    setError: state.setError,
  }));

  const handleAddTask = () => {
    const sessionId = taskStore.activeSession;
    if (!sessionId) return; // No active session
    const task: Task = {
      _id: String(Date.now()), // Dummy task ID, replace actual logic
      task: txt,
      isDone: false,
    };
    taskStore.addTask(sessionId, task);
    setTxt("");
  };
  return (
    <>
      {taskStore.tasks[sess].length > 0 && (
        <span className="divider font-extralight tracking-tight text-sm italic">
          Click on a task to toggle status
        </span>
      )}

      {taskStore.tasks[sess].map((t) => (
        <div className="flex items-center">
          <div>
            <button
              className="btn btn-circle bg-red-400 hover:bg-red-700 hover:skew-x-12 btn-xs"
              onClick={() => {
                taskStore.delTask(sess, t._id);
              }}
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
          <div
            className="flex justify-between bg-base-100 rounded-md shadow-md px-4 py-2 my-2 mx-4 w-full"
            onClick={() => taskStore.toggleTask(sess, t._id)}
          >
            <span>{t.task}</span>
            <span>
              {t.isDone ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaWindowClose color="red" />
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
      {txt === "" ? (
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
