import { useApi } from "~/hooks/use-api";
import { Fetcher } from "./fetcher";

export const checkEmail = async (email) => {
  return (await Fetcher.post)("/check-email", { email });
};

export const useCheckEmail = (email) => {
  return useApi(checkEmail, email);
};
