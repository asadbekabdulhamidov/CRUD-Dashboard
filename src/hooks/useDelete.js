import { useState } from "react";
import axios from "axios";

const useDelete = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (url) => {
    setLoading(true);
    try {
      const response = await axios.delete(url);
      setData(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, remove };
};

export default useDelete;
