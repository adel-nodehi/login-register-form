import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthProp {
  user?: string;
  password?: string;
  roles?: string[];
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
  if (auth === undefined)
    throw new Error("AuthContext can't be use outside the AuthProvider");
  return auth;
};

export { AuthProvider, useAuth };
