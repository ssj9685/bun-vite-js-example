import { Fetcher } from "./fetcher";

export const signIn = async (data) => {
  return await Fetcher.post("/sign-in", data);
};
