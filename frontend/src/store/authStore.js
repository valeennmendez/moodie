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
      isAuthenticated: null,
      isVerifying: null,
      isResending: null,

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("auth/login/", data);
          set({ authUser: res.data.user, isAuthenticated: true });
          console.log("DATA DESDE LOGIN: ", res);
          return res.status;
        } catch (error) {
          console.log("Error in login.", error.response.data);
          toast.error(error.response.data.error);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("auth/signup/", data);
          set({ authUser: res.data.user.email });
          return res.status;
        } catch (error) {
          console.log("Error in signup: ", error);
          toast.error(error.response.data.error);
          return error.status;
        } finally {
          set({ isSigningUp: false });
        }
      },

      verification: async (data) => {
        set({ isVerifying: true });
        try {
          const res = await axiosInstance.post("auth/verification/", data);
          console.log(res);
          return res.status;
        } catch (error) {
          console.log("Error in verification: ", error);
          toast.error(error.response.data.error);
          return error.status;
        } finally {
          set({ isVerifying: false });
        }
      },

      resendEmail: async (data) => {
        set({ isResending: true });
        try {
          console.log("EMAIL DESDE RESENDEMAIL: ", data);
          const res = await axiosInstance.post("auth/resend-email/", data);
          return res.status;
        } catch (error) {
          console.log("Error in resendEmail: ", error);
          toast.error(error.response.data.error);
          return error.status;
        } finally {
          set({ isResending: false });
        }
      },
    }),
    {
      name: "auth-store", // clave en localStorage
      partialize: (state) => ({ authUser: state.authUser }), // solo persistimos authUser
    }
  )
);
