import { useState } from "react";
import axios from "axios";

const usePost = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (url, payload) => {
    setLoading(true);
    try {
      const response = await axios.post(url, payload);
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

  return { data, loading, error, post };
};

export default usePost;
