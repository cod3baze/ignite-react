import { createContext, useContext, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";

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

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refresh_token, permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });

      Router.push("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
