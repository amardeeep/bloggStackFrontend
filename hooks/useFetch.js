import { useState, useEffect } from "react";
//this hook will take url and options as arguments and return loading error and data
function useFetch(url, optns = {}, dependencies = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch(url, { ...optns })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Http Error :${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(setLoading(false));
    };
    if (url) {
      fetchData();
    }
  }, [url, optns, dependencies]);
  return { loading, error, data };
}
export default useFetch;
