import axios from "axios";
import { baseUrl } from "../utils/constants.utils";
import handlePromise from "../utils/handlePromise.utils";
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
    return { data: null, err: resErr?.response?.data?.error || resErr.message };
  }
};
