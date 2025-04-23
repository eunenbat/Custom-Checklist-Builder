import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
	// baseURL: "http://127.0.0.1:8000/",
});
// console.log(localStorage.getItem(ACCESS_TOKEN));
// console.log("Base URL:", import.meta.env.VITE_API_URL);
api.interceptors.request.use(
	(config: AxiosRequestConfig): AxiosRequestConfig => {
		console.log("Request:", config);
		const token = localStorage.getItem(ACCESS_TOKEN);
		// console.log(token);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error: AxiosError): Promise<AxiosError> => {
		console.error("Request Error:", error);
		return Promise.reject(error)
	},
);
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log("Response:", response);
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Response Error:", error.response?.data);
    console.error("Status:", error.response?.status);
    return Promise.reject(error);
  }
);
export default api;
