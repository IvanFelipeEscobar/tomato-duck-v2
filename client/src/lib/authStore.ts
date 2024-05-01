
import {create} from 'zustand';
import { toast } from 'react-toastify';
import { addNewUser } from './api';

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
  signIn: (username: string, password: string) => Promise<void>;
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
      // Perform sign-up API request
      const response = await addNewUser(userName, email, password)

      if (response.ok) {
        set({ isSuccess: true, isLoading: false });
        toast.success("Sign up successful!");
      } else {
        const { message } = await response.json();
        set({ isError: true, isLoading: false, message });
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      set({ isError: true, isLoading: false, message: "An error occurred" });
      toast.error("An error occurred");
    }
  },

  signIn: async (username, password) => {
    try {
      set({ isLoading: true });
      // Perform sign-in API request
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        set({ isAuthenticated: true, user: user, isLoading: false });
        toast.success("Sign in successful!");
      } else {
        const { message } = await response.json();
        set({ isError: true, isLoading: false, message });
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      set({ isError: true, isLoading: false, message: "An error occurred" });
      toast.error("An error occurred");
    }
  },

  checkLoggedIn: async () => {
    try {
      // Perform check-logged-in API request
      const response = await fetch('/api/loggedin');
      if (response.ok) {
        set({ isAuthenticated: true });
      } else {
        set({ isAuthenticated: false });
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  },

  logOut: async () => {
    try {
      // Perform log-out API request
      const response = await fetch('/api/logout');
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
      set({ isError: true, message: "An error occurred" });
      toast.error("An error occurred");
    }
  },
}));

export default useAuthStore;
