import Timer from "../timer";
import SessionPanel from "./session";
import { MdAssignmentAdd } from "react-icons/md";
// import { addNewSession } from "../../lib/api.ts";
import { v4 as uuidv4 } from "uuid";
import useTaskStore, { Session } from "../../lib/taskStore.ts";
import { useState } from "react";
import ChatBot from "../chat-bot/index.tsx";


const TaskPanel = () => {
  const [view, setView] = useState<string>("tomato");
  const { addSession, user } = useTaskStore();

  const handleAddSession = async () => {
    // if (isAuthenticated) {
    //   try {
    //     const res = await addNewSession(user._id);
    //     const newSess: Session = await res.json();
    //     addSession(newSess);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    const session: Session = {
      _id: uuidv4(),
      tasks: [],
    };
    addSession(session);
  };
  // };
  return (
    <> 
      <div className="pt-16 sm:pt-12 flex flex-col-reverse  gap-4 justify-end items-center bg-error min-h-screen">
        <div className="md:w-3/4 lg:w-1/2 w-full px-1">
          <div>
            {user.sessions[user.sessions.length - 1].tasks.length === 0 ? (
              <div
                className="tooltip tooltip-right"
                data-tip="Add atleast one task to your latest session before you create a new one"
              >
                <button
                  className="btn btn-info btn-sm text-base-200 rounded-full my-4 btn-disabled"
                  onClick={handleAddSession}
                >
                  Add session
                  <MdAssignmentAdd />
                </button>
              </div>
            ) : (
              <button
                className="btn btn-info btn-sm text-base-200 rounded-full my-4 "
                onClick={handleAddSession}
              >
                Add session
                <MdAssignmentAdd />
              </button>
            )}
          </div>
          <SessionPanel />
        </div>
        <div className={view === "tomato" ? "" : "hidden"}>
          <Timer />{" "}
        </div>
        <div className={view === "duck" ? "" : "hidden"}>
          <ChatBot />
        </div>
      </div>

      <button
        onClick={() => setView("tomato")}
        className="btn btn-circle bg-base-200 border-neutral absolute sm:top-48 sm:right-4 top-16 right-4 shadow-xl focus:bg-slate-500"
      >
        <div className="tooltip" data-tip="Tomato timer">
          <img src="/tomato-24.svg" alt="tomato" className="w-10" />
        </div>{" "}
      </button>

      <button
        onClick={() => setView("duck")}
        className="btn btn-circle bg-base-200 border-neutral absolute sm:top-32 sm:right-4 top-16 right-20 shadow-xl focus:bg-slate-500"
      >
        <div className="tooltip" data-tip="Ask a duck">
          <img src="/duck.png" alt="duck" className="w-10" />
        </div>
      </button>
    </>
  );
};

export default TaskPanel;
