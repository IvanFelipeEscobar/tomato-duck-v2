import { useState } from "react";
import useTaskStore, { Session } from "../../lib/taskStore.ts";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import TaskList from "./task.tsx";
const SessionPanel = () => {
  const [del, setDel] = useState("");
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
  const handleAddSession = () => {
    const session: Session = {
      _id: String(Date.now()),
      tasks: [],
    };
    taskStore.addSession(session);
  };
  return (
    <div className="md:w-1/2">
      <div className="card-actions justify-end">
        <button
          className="btn btn-info btn-sm rounded-full my-4 mr-14"
          onClick={handleAddSession}
        >
          Add session
          <MdAssignmentAdd />
        </button>
      </div>
      {taskStore.sessions.map((session, i) => (
        <>
          <div key={`session-${i + 1}`} className="flex items-center gap-3">
            <div
              key={session._id}
              className="collapse collapse-plus bg-base-200"
            >
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Session {i + 1}
              </div>
              
              <div className="collapse-content">
                <TaskList sess={session._id} />
              </div>
            </div>
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-red-300 btn-sm hover:bg-red-700 rounded-full"
              >
                <MdOutlineDeleteForever />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <form className="flex flex-col justify-center items-center">
                    <p className="text-center italic">
                      Type 'delete' to delete session
                    </p>

                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-sm rounded-full w-full"
                      onChange={(e) => setDel(e.target.value)}
                      value={del}
                    ></input>

                    {del === "delete" ? (
                      <button
                        className="btn btn-warning btn-sm mt-4 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          taskStore.deleteSession(session._id);
                          setDel("");
                        }}
                      >
                        Delete
                        <MdOutlineDeleteForever />
                      </button>
                    ) : (
                      <button className="btn btn-sm btn-disabled rounded-full mt-4">
                        Delete
                        <MdOutlineDeleteForever />
                      </button>
                    )}
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <span className="divider"></span>
        </>
      ))}
    </div>
  );
};

export default SessionPanel;
