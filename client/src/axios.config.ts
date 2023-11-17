import axios, { AxiosError } from "axios";
import { deleteAccessToken, deleteUser, getAccessToken } from "./utils/tokens";
import Swal from "sweetalert2";

const httpInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpInstance.interceptors.request.use((request) => {
  if (getAccessToken()) {
    request.headers.Authorization = `Bearer ${getAccessToken()}`;
  }

  return request;
});

httpInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response?.status === 403) {
      deleteAccessToken();
      deleteUser();
      await Swal.fire({
        title: "Session Timeout",
        text: "Session has expired, log in again",
        showConfirmButton: false,
        timer: 2000,
        icon: "error",
      });
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default httpInstance;
