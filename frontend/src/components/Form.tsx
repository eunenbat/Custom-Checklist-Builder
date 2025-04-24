import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form({ route, method }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post(route, { username, password });
			// console.log(response.data.refresh)
			// console.log(response.data.access)
			if (method == "login") {
				// console.log('SHOULD GO TO HOME');
				localStorage.setItem(ACCESS_TOKEN, response.data.access);
				localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
				navigate("/");
			} else {
				navigate("/login");
			}
		} catch (error) {
			alert(error);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h1>{method == "login" ? "Login" : "Register"}</h1>
			<input
				type="text"
				className="form-input"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				required
			/>

			<input
				type="password"
				className="form-input"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				required
			/>
			<button type="submit" className="form-button">
				{method == "login" ? "Login" : "Register"}
			</button>
		</form>
	);
}
export default Form;
