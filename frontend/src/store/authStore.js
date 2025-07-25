import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const authStore = create((set, get) => ({
  isLoggingIn: false,
  isSigningUp: false,
  authUser: null,

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login/", data);
      set({ authStore: res.data });
      console.log(res.data);
    } catch (error) {
      console.log("Error in login.");
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
