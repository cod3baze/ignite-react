import { useQuery } from "react-query";
import { api } from "../service/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers() {
  const { data } = await api.get<{ users: User[] }>("/users");

  const users = data?.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: new Date(user.createdAt).toLocaleDateString("pt-Br", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery("users", getUsers, { staleTime: 1000 * 5 });
}
