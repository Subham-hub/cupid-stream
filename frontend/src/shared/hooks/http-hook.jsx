import axios from "axios";
import { useCallback, useState } from "react";

export const useHttp = () => {
  const [isLoading, setIsloading] = useState();
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (endpoint, method = "GET", data, headers) => {
      try {
        setIsloading(true);
        const response = await axios({
          method,
          url: `${import.meta.env.VITE_BACKEND_URL}/api/v1/${endpoint}`,
          data,
          headers,
        });
        setIsloading(false);
        return response.data;
      } catch (e) {
        setIsloading(false);
        setError(e.response.data.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
};
