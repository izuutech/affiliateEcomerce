import axios from "axios";
import { baseUrl } from "../utils/constants.utils";
import handlePromise from "../utils/handlePromise.utils";
import { clearCache } from "./shared";

export const signup = async (body) => {
  const [res, resErr] = await handlePromise(
    axios.post(`${baseUrl}register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  if (res) {
    return [res.data, null];
  } else {
    clearCache(resErr?.response?.data?.error);
    return [null, resErr?.response?.data?.error || resErr.message];
  }
};

export const signin = async (body) => {
  const [res, resErr] = await handlePromise(
    axios.post(`${baseUrl}login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  if (res) {
    return [res.data, null];
  } else {
    clearCache(resErr?.response?.data?.error);
    return [null, resErr?.response?.data?.error || resErr.message];
  }
};
