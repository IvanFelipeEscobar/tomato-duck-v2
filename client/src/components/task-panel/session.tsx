import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useTaskStore, { Session } from "../../lib/taskStore.ts";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import TaskList from "./task.tsx";
import { v4 as uuidv4 } from "uuid";

import { addNewSession, deleteOneSession } from "../../lib/api.ts";
const SessionPanel = () => {
  const [del, setDel] = useState<string>("");
  const taskStore = useTaskStore((state) => ({
    user: state.user,
    activeSession: state.activeSession,
    addSession: state.addSession,
    setActiveSession: state.setActiveSession,
    deleteSession: state.deleteSession,
  }));
  const { isAuthenticated, user } = useAuth0();

  const handleAddSession = async () => {
    if (isAuthenticated) {
      try {
        const res = await addNewSession(taskStore.user._id);
        const newSess: Session = await res.json();
        taskStore.addSession(newSess);
      } catch (error) {
        console.error(error);
      }
    } else {
      const session: Session = {
        _id: uuidv4(),
        tasks: [],
      };
      taskStore.addSession(session);
    }
  };

  return (
    <div className="md:w-2/3 lg:w-1/2">
      <div>
        <button
          className="btn btn-info btn-sm rounded-full my-4"
          onClick={handleAddSession}
        >
          Add session
          <MdAssignmentAdd />
        </button>
        <span className="ml-16">{user?.name}</span>
      </div>

      {taskStore.user.sessions.length === 0 && (
        <div className="bg-base-200 p-4 rounded-2xl">
          <p className="italic font-extralight text-center">
            To begin add your first session with the button above
          </p>
        </div>
      )}

      {taskStore.user.sessions.map((session, i) => (
        <div key={session._id}>
          <div className="flex items-center gap-3">
            <div className="collapse collapse-plus bg-base-200">
              <input
                type="radio"
                name="my-accordion-3"
                onClick={() => {
                  taskStore.setActiveSession(session._id);
                }}
              />
              <div className="collapse-title text-xl font-medium">
                Session {i + 1}
              </div>

              <div className="collapse-content">
                <TaskList sess={i} />
              </div>
            </div>
            <div className="dropdown dropdown-left">
              <div
                tabIndex={0}
                role="button"
                className=" hover:bg-red-400 btn bg-error border-0 btn-circle"
              >
                <MdOutlineDeleteForever size={24} />
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
                        onClick={async (e) => {
                          e.stopPropagation();
                          if(isAuthenticated) {
                            deleteOneSession(taskStore.user._id, session._id);}
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
        </div>
      ))}
    </div>
  );
};

export default SessionPanel;
