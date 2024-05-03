import { create } from "zustand";

import { addNewUser, loginStatus, logInUser, logOutUser, sendVerifyEmail } from "./api";
import { toast } from "react-toastify";

interface User {
  _id: string;
  email: string;
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
}

const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  isAuthenticated: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",

  signUp: async (userName, email, password) => {
    try {
      set({ isLoading: true });
      const response = await addNewUser(userName, email, password);
      console.log(response);
        if (response.ok) {
          set({ isSuccess: true, isLoading: false });
          toast.success("Sign up successful!");
          const em = await sendVerifyEmail() 
          if(em.ok){
            toast.success('Account Verification email has been sent')
          }
        } else {
          const { message } = await response.json();
          set({ isError: true, isLoading: false, message });
          toast.error(message);
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
      const user = await response.json();
      set({ isAuthenticated: true, user: user, isLoading: false });
    } else {
      const { message } = await response.json();
      toast.error(message);
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
          toast.success("Logged out successfully!");
        } else {
          const { message } = await response.json();
          set({ isError: true, message });
          toast.error(message);
        }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
