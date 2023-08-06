import axios from "axios";
import { baseUrl } from "../utils/constants.utils";
import handlePromise from "../utils/handlePromise.utils";
import { clearCache } from "./shared";

export const fetchProducts = async (pagination) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.get(
      `${baseUrl}product?page=${pagination.page}&limit=${pagination.limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
  );
  if (res) {
    return { data: res.data, err: null };
  } else {
    clearCache(resErr?.response?.data?.error);
    return { data: null, err: resErr?.response?.data?.error || resErr.message };
  }
};

export const fetchSingleProduct = async (id) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.get(`${baseUrl}product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  );
  if (res) {
    return { data: res.data, err: null };
  } else {
    clearCache(resErr?.response?.data?.error);
    return { data: null, err: resErr?.response?.data?.error || resErr.message };
  }
};
