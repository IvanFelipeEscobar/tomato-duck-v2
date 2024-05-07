import { create } from "zustand";
import {
  addNewUser,
  fetchUser,
  loginStatus,
  logInUser,
  logOutUser,
} from "./api";
import { toast } from "react-toastify";
import { persist } from "zustand/middleware";
import { Session } from "./taskStore";

interface User {
  _id: string;
  email: string;
  userName: string;
  isVerified: boolean;
  sessions: Session[] | [];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface AuthActions {
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  checkLoggedIn: () => Promise<void>;
  logOut: () => Promise<void>;
  getUser: () => Promise<void>;
}
const initialState = {
  isAuthenticated: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      signUp: async (userName, email, password) => {
        try {
          set({ isLoading: true });
          const response = await addNewUser(userName, email, password);
          if (response.ok) {
            const newUser = await response.json();

            set({
              isSuccess: true,
              user: newUser,
              isLoading: false,
              isAuthenticated: true,
            });
            toast.success("Sign up successful!");
          } else {
            const { message } = await response.json();
            set({ isError: true, isLoading: false, message });
            toast.error(message);
            return
          }
        } catch (error) {
          console.error(error);
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true });
        // Perform sign-in API request
        const response = await logInUser(email, password);
        if (response.ok) {
          set({ isAuthenticated: true, isLoading: false });
          toast.success("welcome back!");
        } else {
          const { message } = await response.json();
          toast.error(message);
          return
        }
      },

      checkLoggedIn: async () => {
        try {
          const response = await loginStatus();
          if (response.ok) {
            const isAuthenticated = await response.json();
            set({ isAuthenticated });
          } else {
            set({ isError: true });
          }
        } catch (error) {
          console.error(error);
          set({ isError: true });
        }
      },

      logOut: async () => {
        try {
          // Perform log-out API request
          const response = await logOutUser();
          if (response.ok) {
            set({ isAuthenticated: false, user: null });
            toast.info("Logged out successfully!");
          } else {
            const { message } = await response.json();
            set({ isError: true, message });
            toast.error(message);
          }
        } catch (error) {
          console.error(error);
        }
      },
      getUser: async () => {
        try {
          const res = await fetchUser();
          const user = await res.json();
          if(user)set({isAuthenticated: true, user})
          return user;
        } catch (error) {
          set({isError: true})
        }
      },
    }),

    { name: "auth-store" }
  )
);

export default useAuthStore;
