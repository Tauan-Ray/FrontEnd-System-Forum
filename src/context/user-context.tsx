"use client"

import { deleteSession, getUser, UserProps } from "@/app/auth/lib/sessions";
import { HttpStatusCode } from "axios";
import * as React from "react"
import { toast } from "sonner";

const UserContext = React.createContext<UserProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserProps>();

  React.useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const res = await getUser();
        if (!res?.message) {
          setUser(res);
        } else {
          
          if (res.status == HttpStatusCode.Unauthorized) {
            deleteSession();
          } else {
            console.log(res);

            toast.error('Atenção', {
              description: res.message,
            })
          }
        }
      }
    };
    fetchUser();
  }, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => React.useContext(UserContext);
