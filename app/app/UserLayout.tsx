"use client";
import { useProject, useUser } from "@/Hook/Zustand";
import { createClient } from "@/lib/supabase/client";
import { UserInfo } from "@/Types/type";
import React from "react";

const UserLayout = () => {
  const { addProject, setLoading, setFilter } = useProject();
  const { updateUser } = useUser();
  React.useEffect(() => {
    const supabase = createClient();
    const FetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const user: UserInfo = {
        id: data.user?.id || null,
        email: data?.user?.email || null,
        name: data?.user?.user_metadata.username || null,
        role: data.user?.user_metadata?.role || null,
      };
      updateUser(user);
    };
    FetchUser();
  }, [updateUser]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      addProject(data);
      setFilter(data);
      setLoading(false);
    };
    setLoading(true);
    fetchProjects();
  }, [addProject, setLoading, setFilter]);

  return null;
};

export default UserLayout;
