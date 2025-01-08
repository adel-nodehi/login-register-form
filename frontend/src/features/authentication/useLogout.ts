import { API_CONFIG } from "../../api/apiConfig";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});

    try {
      await axios.get(API_CONFIG.logout, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
