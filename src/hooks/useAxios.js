import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [data, setData] = useState(null); // Ma'lumotlarni saqlash uchun
  const [loading, setLoading] = useState(true); // Yuklanish holati
  const [error, setError] = useState(null); // Xatolikni saqlash uchun

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url); // API so'rovini yuborish
        setData(response.data); // Ma'lumotlarni saqlash
      } catch (err) {
        setError(err); // Xatolikni saqlash
      } finally {
        setLoading(false); // Yuklanish tugaganligini bildirish
      }
    };

    fetchData(); // Funksiyani chaqirish
  }, [url]); // URL o'zgarganda qayta ishlash

  return { data, loading, error }; // Ma'lumotlarni qaytarish
};

export default useAxios;
