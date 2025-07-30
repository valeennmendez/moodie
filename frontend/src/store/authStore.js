import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const authStore = create(
  persist(
    (set, get) => ({
      isLoggingIn: false,
      isSigningUp: false,
      authUser: null,
      isVerifying: null,

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("auth/login/", data);
          set({ authUser: res.data.user }); // <-- corregido
        } catch (error) {
          console.log("Error in login.", error.response.data);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("auth/signup/", data);
          set({ authUser: res.data.user.email });
        } catch (error) {
          console.log("Error in signup: ", error);
          toast.error(error.response.data.error);
        } finally {
          set({ isSigningUp: false });
        }
      },

      verification: async (data) => {
        set({ isVerifying: true });
        try {
          const res = await axiosInstance.post("auth/verification/", data);
          console.log(res);
        } catch (error) {
          console.log("Error in verification: ", error);
          toast.error(error.response.data.error);
        } finally {
          set({ isVerifying: false });
        }
      },
    }),
    {
      name: "auth-store", // clave en localStorage
      partialize: (state) => ({ authUser: state.authUser }), // solo persistimos authUser
    }
  )
);
