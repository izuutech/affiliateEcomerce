import axios from "axios";
import { baseUrl } from "../utils/constants.utils";
import handlePromise from "../utils/handlePromise.utils";
import { clearCache } from "./shared";

export const createProduct = async (body) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.post(`${baseUrl}product`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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
