import { createContext, useContext } from "react";
import { api } from "../services/api";

type SignInCredentials = {
  email: string;
  password: string;
};

type IAuthContextDataType = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextDataType);

export const AuthContextProvider = ({ children }: IAuthProvider) => {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
