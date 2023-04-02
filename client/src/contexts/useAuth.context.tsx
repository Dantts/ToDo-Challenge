import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { Navigate } from "react-router-dom";

type UserProps = {
  id?: string;
  username: string;
  name: string;
};

type RegisterProps = {
  id?: string;
  username: string;
  password: string;
  name: string;
};

type SignInCredentialsProps = {
  username: string;
  password: string;
};

type AuthContextType = {
  signIn: (credentials: SignInCredentialsProps) => Promise<void>;
  signUp: (credentials: RegisterProps) => Promise<void>;
  signOut: () => void;
  user?: UserProps;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

let authChannel: BroadcastChannel;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) getMe();
  }, []);

  const getMe = async () => {
    try {
      const res = await api.get("/auth/me");

      const { data } = res.data;

      setUser(data);
    } catch (error) {
      signOut();
    }
  };

  const signIn = async ({ username, password }: SignInCredentialsProps) => {
    try {
      const res = await api.post("/auth/sign-in", { username, password });

      const { data } = res.data;

      setUser(data);

      sessionStorage.setItem("token", data.token);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      window.location.replace("/todo");
    } catch (error) {
      throw new Error();
    }
  };

  const signUp = async ({ username, password, name }: RegisterProps) => {
    try {
      const res = await api.post("/auth/sign-up", { username, password, name });

      const { data } = res.data;

      setUser(data);

      sessionStorage.setItem("token", data.token);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      window.location.replace("/todo");
    } catch (error) {
      throw new Error();
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("token");
    setUser(undefined);
    window.location.replace("/");
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
