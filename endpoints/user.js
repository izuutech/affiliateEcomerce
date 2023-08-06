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

export const fetchProfile = async (body) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.get(`${baseUrl}user`, {
      headers: {
        "Content-Type": "application/json",
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

export const fundUser = async (body) => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.post(`${baseUrl}user/fund`, body, {
      headers: {
        "Content-Type": "application/json",
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

export const withdraw = async () => {
  const token = localStorage.getItem("token");
  const [res, resErr] = await handlePromise(
    axios.get(`${baseUrl}user/withdraw`, {
      headers: {
        "Content-Type": "application/json",
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
