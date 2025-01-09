import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useDebugValue,
  useEffect,
  useState,
} from "react";
import useToggle from "../hooks/useToggle";

interface AuthProp {
  user?: string;
  password?: string;
  roles?: number[];
  accessToken?: string;
}

interface ContextState {
  auth: AuthProp;
  setAuth: Dispatch<SetStateAction<AuthProp>>;
  allowPersist?: boolean;
  toggleAllowPersist?: () => void;
}

const AuthContext = createContext<ContextState>({
  auth: {},
  setAuth() {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({});
  const [allowPersist, toggleAllowPersist] = useToggle(
    JSON.parse(String(localStorage.getItem("allowPersist"))) || false,
  );

  useEffect(() => {
    localStorage.setItem("allowPersist", JSON.stringify(allowPersist));
  }, [allowPersist]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        allowPersist,
        toggleAllowPersist,
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
