import { useQuery } from "react-query";
import { api } from "../service/api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// export type GetUsersResponse = {
//   totalCount: number;
//   users: User[];
// };

export async function getUsers(page: number) {
  const { data, headers } = await api.get<{ users: User[] }>("/users", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

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

  return { users, totalCount };
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 5,
  });
}
