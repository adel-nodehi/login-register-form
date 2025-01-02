import { API_CONFIG } from "../api/apiConfig";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(API_CONFIG.refresh, {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data?.accessToken);

      return {
        ...prev,
        accessToken: response.data?.accessToken,
      };
    });

    return response.data?.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
