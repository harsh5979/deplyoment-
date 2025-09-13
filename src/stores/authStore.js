import { create } from "zustand";
import { authAPI } from "../services/api.js";
import axios from "axios";
import { toast } from "react-hot-toast";
const url = import.meta.env.VITE_API_URL ;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isAdmin:false,
  isCheckingAuth:false,

    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${url}/v1/logout`)
            toast.success(response.data.message)
            set({ isLoading: false, user: null, isAdmin: false, isAuthenticated: false, error: null })

        } catch (error) {
            toast.error(error.response.data.message)
            set({ error: error.response.data.message || 'Error in logout ', isLoading: false })
        }

    },
 checkAuth: async () => {
        set({ isLoading: true, error: null, isAdmin: false, isCheckingAuth: true })
        try {
            const response = await axios.get(`${url}/v1/checkAuth`,{
                      withCredentials: true,

            })
            set({user:response.data.user, isLoading: false, isAuthenticated: true, isAdmin: response.data.user.role, error: null, isCheckingAuth: false })

        } catch (error) {
            set({ isLoading: false ,isCheckingAuth:false})

        }

    },
  setLoading: (isLoading) => set({ isLoading }),

  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
    }),



  updateUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
}));
