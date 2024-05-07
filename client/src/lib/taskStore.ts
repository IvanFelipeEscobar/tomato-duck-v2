import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  _id: string;
  email: string;
  userName: string;
  sessions: Session[] | [];
}
export interface Session {
  _id: string;
  tasks: Task[];
}

export interface Task {
  _id: string;
  task: string;
  isDone: boolean;
}

export interface TaskState {
  currentUser: User;
  activeSession: string | null;
}

export interface TaskActions {
  setUser: (user: User) => void;
  addSession: (session: Session) => void;
  setActiveSession: (sessionId: string | null) => void;
  deleteSession: (sessionId: string) => void;
  addTask: (sessionId: string, task: Task) => void;
  delTask: (sessionId: string, taskId: string) => void;
  toggleTask: (sessionId: string, taskId: string) => void;
}

export const initialState: TaskState = {
  currentUser: {
    _id: "00001",
    email: "guest",
    userName: 'guest',
    sessions: [{ _id: "0001", tasks: [] }],
  },
  activeSession: null,
};

const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (currentUser) => set({ currentUser }),

      addSession: (session) =>
        set((state) => ({
          ...state,
          currentUser: {
            ...state.currentUser,
            sessions: [...state.currentUser.sessions, session],
          },
          activeSession: state.activeSession || session._id,
        })),

      setActiveSession: (sessionId) => set({ activeSession: sessionId }),

      deleteSession: (sessionId: string) =>
        set((state) => ({
          ...state,
         currentUser: {
            ...state.currentUser,
            sessions: state.currentUser.sessions.filter(
              (session) => session._id !== sessionId
            ),
          },
          activeSession:
            state.activeSession === sessionId ? null : state.activeSession,
        })),

      addTask: (sessionId, task) =>
        set((state) => {
          const addTaskArray = state.currentUser.sessions.map((session) =>
            session._id === sessionId
              ? { ...session, tasks: [...session.tasks, task] }
              : session
          );
          return {
            ...state,
            currentUser: {
              ...state.currentUser,
              sessions: addTaskArray,
            },
          };
        }),

      delTask: (sessionId, taskId) =>
        set((state) => {
          const delTaskArray = state.currentUser.sessions.map((session) =>
            session._id === sessionId
              ? {
                  ...session,
                  tasks: session.tasks.filter((x) => x._id !== taskId),
                }
              : session
          );
          return {
            ...state,
            currentUser: {
              ...state.currentUser,
              sessions: delTaskArray,
            },
          };
        }),

      toggleTask: (sessionId, taskId) =>
        set((state) => {
          const toggleTaskArray = state.currentUser.sessions.map((session) =>
            session._id === sessionId
              ? {
                  ...session,
                  tasks: session.tasks.map((t) =>
                    t._id === taskId ? { ...t, isDone: !t.isDone } : t
                  ),
                }
              : session
          );
          return {
            ...state,
            currentUser: {
              ...state.currentUser,
              sessions: toggleTaskArray,
            },
          };
        }),
    }),

    { name: "task-store" }
  )
);

export default useTaskStore;
