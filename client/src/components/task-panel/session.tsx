import { useState } from "react";

import useTaskStore from "../../lib/taskStore.ts";
import { MdOutlineDeleteForever } from "react-icons/md";
import TaskList from "./task.tsx";
import useAuthStore from "../../lib/authStore";
import { deleteOneSession } from "../../lib/api.ts";

const SessionPanel = () => {
  const {isAuthenticated} = useAuthStore()
  const [del, setDel] = useState<string>("");
  const taskStore = useTaskStore((state) => ({
    user: state.currentUser,
    activeSession: state.activeSession,
    addSession: state.addSession,
    setActiveSession: state.setActiveSession,
    deleteSession: state.deleteSession,
  }));

  return (
    <>
      {taskStore.user.sessions.length === 0 && (
        <div className="bg-base-200 p-4 rounded-2xl">
          <p className="italic font-extralight text-center">
            To begin add your first session with the button above
          </p>
        </div>
      )}

      {taskStore.user.sessions.map((session, i) => (
        <div key={session._id}>
          <div className="flex items-start md:gap-3 mb-6">
            <div className="collapse collapse-plus bg-base-200 bg-opacity-70 shadow-md">
              <input
                type="radio"
                name="my-accordion-3"
                onClick={() => taskStore.setActiveSession(session._id)}
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
                className=" hover:bg-red-400 btn bg-error border-0 btn-xs  p-0 rounded-full sm:btn-sm"
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
                          if (isAuthenticated) {
                            deleteOneSession(taskStore.user._id, session._id);
                          }
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
    </>
  );
};

export default SessionPanel;
