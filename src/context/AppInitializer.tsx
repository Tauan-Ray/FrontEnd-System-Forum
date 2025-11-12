"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

type AppInitializerProps = {
  children: React.ReactNode;
};

export default function AppInitializer({ children }: AppInitializerProps) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
