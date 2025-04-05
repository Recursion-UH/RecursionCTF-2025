import axios, { AxiosHeaders } from "axios";

interface callAPIConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: string; // JSON in string format
  headers?: AxiosHeaders;
}

export async function callAPI(config: callAPIConfig) {
  const {
    url,
    method = "GET",
    data,
    headers = { "Content-Type": "application/json" },
  } = config;

  const axiosClient = axios.create();

  const response = await axiosClient({
    method,
    url,
    data,
    headers,
  }).catch((error) => {
    if (error.response) {
      return Promise.reject(error.response.data.message);
    }
    return Promise.reject(error);
  });

  return response.data;
}
