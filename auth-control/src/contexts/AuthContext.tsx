import { createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";

import { api } from "../services/apiClient";

type User = {
  email: string;
  permissions: string[];
  roles: string[]; // cargos
};

type SignInCredentials = {
  email: string;
  password: string;
};

type IAuthContextDataType = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextDataType);

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refresh_token");

  Router.push("/");
}

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "nextauth.refresh_token", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
