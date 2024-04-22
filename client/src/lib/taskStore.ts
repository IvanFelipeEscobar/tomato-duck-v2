import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface User {
  _id: string;
  email: string;
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
  user: User;
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
  user: {
    _id: "00001",
    email: "guest",
    sessions: [{ _id: "0001", tasks: [] }],
  },
  activeSession: null,
};

const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),

      addSession: (session) =>
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            sessions: [...state.user.sessions, session],
          },
          activeSession: state.activeSession || session._id,
        })),

      setActiveSession: (sessionId) => set({ activeSession: sessionId }),

      deleteSession: (sessionId: string) =>
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            sessions: state.user.sessions.filter(
              (session) => session._id !== sessionId
            ),
          },
          activeSession:
            state.activeSession === sessionId ? null : state.activeSession,
        })),

      addTask: (sessionId, task) =>
        set((state) => {
          const addTaskArray = state.user.sessions.map((session) =>
            session._id === sessionId
              ? { ...session, tasks: [...session.tasks, task] }
              : session
          );
          return {
            ...state,
            user: {
              ...state.user,
              sessions: addTaskArray,
            },
          };
        }),

      delTask: (sessionId, taskId) =>
        set((state) => {
          const delTaskArray = state.user.sessions.map((session) =>
            session._id === sessionId
              ? {
                  ...session,
                  tasks: session.tasks.filter((x) => x._id !== taskId),
                }
              : session
          );
          return {
            ...state,
            user: {
              ...state.user,
              sessions: delTaskArray,
            },
          };
        }),

      toggleTask: (sessionId, taskId) =>
        set((state) => {
          const toggleTaskArray = state.user.sessions.map((session) =>
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
            user: {
              ...state.user,
              sessions: toggleTaskArray,
            },
          };
        }),
    }),

    { name: "task-store" }
  )
);

export default useTaskStore;
