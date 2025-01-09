import React, { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router";

const PersistLogin: React.FC = () => {
  const { auth, allowPersist } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    console.log("useEffect inside PersistLogin");

    const persistLogin = async () => {
      try {
        if (allowPersist) await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (!auth.accessToken) persistLogin();

    if (auth.accessToken) setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [refresh, auth.accessToken, allowPersist]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`accessToken: ${JSON.stringify(auth.accessToken)}`);
    console.log(auth);
  }, [isLoading, auth]);

  if (!allowPersist) return <Outlet />;

  return !allowPersist ? (
    <Outlet />
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <Outlet />
  );
};

export default PersistLogin;
