import { useCallback, useEffect, useState } from "react";

/**
 * @typedef {import('../apis/fetcher').FetchResult} FetchResult
 */

/**
 * @param {function} api
 * @param {any} body
 * @returns {{response: Awaited<FetchResult>, refetch: function}}
 */
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
