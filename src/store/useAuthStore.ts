import { deleteSession, getUser, updateSession, UserProps } from "@/app/auth/lib/sessions"
import { HttpStatusCode } from "axios";
import { create } from "zustand";

type AuthState = {
    user: UserProps | null;
    loading: boolean;
    setUser: (user: UserProps | null) => void;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user }),

    checkAuth: async () => {
        set({ loading: true });

        let user = await getUser();

        if (user.status === HttpStatusCode.Unauthorized) {
            await updateSession();
            user = await getUser();
        }

        if (user?.message) {
            set({ user: null, loading: false })
        } else {
            set({ user, loading: false })
        }
    },

    logout: async () => {
        await deleteSession();
        set({ user: null, loading: false, })
    },
}));