import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import axiosLib from "axios";

import { API_CONFIG } from "../../api/apiConfig";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Users: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState<{ username: string }[] | null>();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(API_CONFIG.users, {
          signal: controller.signal,
        });

        console.log(response.data);

        if (isMounted) setUsers(response.data);
      } catch (error) {
        if (axiosLib.isAxiosError(error) && error?.name !== "CanceledError") {
          console.log(error);

          toast.error("Refresh token expired, please Login");

          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No user to display</p>
      )}
    </article>
  );
};

export default Users;
