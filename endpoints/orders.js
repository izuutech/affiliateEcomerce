import axios from "axios";
import { baseUrl } from "../utils/constants.utils";
import handlePromise from "../utils/handlePromise.utils";
import { clearCache } from "./shared";

export const fetchOrders = async (type) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.get(`${baseUrl}t/orders?type=${type}`, {
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

export const changeOrderStatus = async (id, status) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.put(
      `${baseUrl}t/status/${id}?status=${status}`,
      {},
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
