import { create } from "zustand";
import { persist } from "zustand/middleware";


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
  user: string;
  sessions: Session[];
  activeSession: string | null;
  tasks: Record<string, Task[]>;
  isLoading: boolean;
  error: string | null;
}

export interface TaskActions {
  setUser: (user: string) => void;
  addSession: (session: Session) => void;
  setActiveSession: (sessionId: string | null) => void;
  deleteSession: (sessionId: string) => void;
  addTask: (sessionId: string, task: Task) => void;
  delTask: (sessionId: string, taskId: string) => void;
  toggleTask: (sessionId: string, taskId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
const initialState: TaskState = {
  user: 'guest',
  sessions: [],
  activeSession: null,
  tasks: {},
  isLoading: false,
  error: null,
};

const useTaskStore = create<TaskState & TaskActions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set({ user }),

      addSession: (session) =>
        set((state) => ({
          ...state,
          sessions: [...state.sessions, session],
          tasks: { ...state.tasks, [session._id]: [] },
          activeSession: state.activeSession || session._id,
        })),

      setActiveSession: (sessionId) =>
        set({ activeSession: sessionId }),

      deleteSession: (sessionId: string) =>
        set((state) => {
          const newSess = state.sessions.filter((x) => x._id !== sessionId);
          const updatedTasks = { ...state.tasks };
          delete newSess[parseInt(sessionId)];
          const newActiveSess =
            state.activeSession === sessionId
              ? newSess.length > 0
                ? newSess[0]._id
                : null
              : state.activeSession;
          return {
            ...state,
            sessions: newSess,
            tasks: updatedTasks,
            activeSession: newActiveSess,
          };
        }),

      addTask: ( sessionId, task ) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [sessionId]: [...state.tasks[sessionId], task],
          },
        })),

      delTask: ( sessionId, taskId ) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [sessionId]: state.tasks[sessionId].filter((x) => x._id !== taskId),
          },
        })),
      toggleTask: (sessionId, taskId) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [sessionId]: state.tasks[sessionId].map((t) =>
              t._id === taskId ? { ...t, isDone: !t.isDone } : t
            ),
          },
        })),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error }),
    }),

    { name: "task-store"}
  )
);

export default useTaskStore;
