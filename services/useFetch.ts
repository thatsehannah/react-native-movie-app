import { useEffect, useState } from "react";

//useFetch(fetchMovies)
//this hook will be used with the functions defined in the api.ts file throughout the application
//fetchFunction is a callback function that is passed in as a parameter and will be called within fetchData
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  //when this hook is called, if autoFetch is set to true, the fetchData function will call
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  //refetch is just a copy of the fetchData function that will be used when autoFetch is set to false which will allow us to call the fetchData function manually
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
