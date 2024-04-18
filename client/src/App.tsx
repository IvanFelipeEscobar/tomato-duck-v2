import { useAuth0 } from "@auth0/auth0-react";

import useTaskStore, {  Session, Task } from "./lib/taskStore";
import { useState } from "react";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  console.log(user);
  const [email, setEmail] = useState("");
  const [taskText, setTaskText] = useState('')
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

  const handleAddUser = () => {
    const user: string = email
    taskStore.setUser(user);
  };

  const handleAddSession = () => {
    const session: Session = {
      
      _id: String(Date.now()), // Dummy session ID, replace with your logic
      tasks: [],
    };
    taskStore.addSession(session);
  };

  const handleAddTask = () => {
    const sessionId = taskStore.activeSession;
    if (!sessionId) return; // No active session
    const task: Task = {
      _id: String(Date.now()), // Dummy task ID, replace with your logic
      task: taskText,
      isDone: false,
    };
    taskStore.addTask(sessionId, task);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => loginWithRedirect()}>
        login
      </button>
      {isLoading && <div>loading...</div>}
      <hr />
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} height={30} width={96} />
          <h2>
            {user.given_name} {user.family_name}
          </h2>
          <p>{user.email}</p>
        </div>
      )}
      <button
        className="btn btn-link"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={handleAddUser}>Add User</button>
        <button onClick={handleAddSession}>Add Session</button>
        <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter task"
      />
        <button onClick={handleAddTask}>Add Task</button>

        <ul>
          {taskStore.sessions.map((session) => (
            <li key={session._id}>
              Session ID: {session._id} <button onClick={( )=>taskStore.setActiveSession(session._id)}>set active</button><button onClick={()=> taskStore.deleteSession(session._id)}>deleteSession</button>
              <ul>
                {taskStore.tasks[session._id].map((task) => (
                  <li key={task._id}>
                    Task: {task.task}, Done: {task.isDone.toString()} <button onClick={() => taskStore.toggleTask(session._id, task._id)}>toggle</button> <button onClick={()=> {
                      taskStore.delTask(session._id, task._id)
                    }}>deltask</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
