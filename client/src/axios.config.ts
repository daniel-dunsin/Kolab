import axios from "axios";
import { getAccessToken } from "./utils/tokens";

const httpInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : undefined,
  },
});

export default httpInstance;
