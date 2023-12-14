import { useCallback, useEffect, useState } from "react";

export function useApi(api, body) {
  const [response, setResponse] = useState();
  const fetcher = useCallback(
    (body) => {
      setResponse(undefined);
      api(body).then((value) => setResponse(value));
    },
    [api]
  );

  useEffect(() => {
    fetcher(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    response,
    refetch: fetcher,
  };
}
