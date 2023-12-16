import { useApi } from "~/hooks/use-api";
import { Fetcher } from "./fetcher";

// API 호출 함수와 그 함수를 호출하는 custom hook으로 분리

export const checkEmail = async (email) => {
  return await Fetcher.post("/check-email", { email });
};

export const useCheckEmail = (email) => {
  return useApi(checkEmail, email);
};
