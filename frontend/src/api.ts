import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	// baseURL: "http://127.0.0.1:8000/",
});
// console.log(localStorage.getItem(ACCESS_TOKEN));
console.log("Base URL:", import.meta.env.VITE_API_URL);
api.interceptors.request.use(
	(config) => {
		console.log("Request:", config);
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		console.error("Request Error:", error);
		return Promise.reject(error)
	},
);
// api.interceptors.response.use(
// 	(response) => {
// 	  console.log("Response:", response);
// 	  return response;
// 	},
// 	(error) => {
// 	  console.error("Response Error:", error);
// 	  return Promise.reject(error);
// 	}
//   );
export default api;
