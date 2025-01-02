import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useDebugValue,
  useState,
} from "react";

interface AuthProp {
  user?: string;
  password?: string;
  roles?: number[];
  accessToken?: string;
}

interface ContextState {
  auth: AuthProp;
  setAuth: Dispatch<SetStateAction<AuthProp>>;
}

const AuthContext = createContext<ContextState>({
  auth: {},
  setAuth() {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);

  useDebugValue(auth, (auth) => (auth.auth.user ? "Logged in" : "Logged out"));

  if (auth === undefined)
    throw new Error("AuthContext can't be use outside the AuthProvider");
  return auth;
};

export { AuthProvider, useAuth };
