import { useEffect, useState } from "react";

export let useFetch = (url, option = {}, dependencies = []) => {
  let [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();


  useEffect(() => {
    const fetData = async () => {
        setLoading(true);
      try {
        
        const response = await fetch(url, option);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText},${response.status}`);
        }
        setData(responseData);
        setError();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetData();
  }, dependencies);

  return { data, loading, error };
};
