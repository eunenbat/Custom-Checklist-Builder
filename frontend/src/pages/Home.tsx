import { useState, useEffect } from "react";
import api from "../api";
import Checklist from "../components/Checklist";
import { AxiosError } from "axios";
import '../styles/Home.css';
// import "./Checklist.css";
// interface Checklist {
//   id: number;
//   title: string;
//   date: string;
// }
interface ChecklistItem {
	id: number;
	title: string;
	date: string;
}

function Home() {
	const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
	const [title, setTitle] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [items, setItems] = useState([{ value: "", files: [] as File[] }]);

	useEffect(() => {
		getChecklists();
	}, []);

	const getChecklists = () => {
		api
			.get("/api/checklists/")
			.then((res) => res.data)
			.then((data) => {
				setChecklists(data);
			})
			.catch((err) => alert(err));
	};

	const deleteChecklist = (id: number) => {
		api
			.delete(`/api/checklists/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert("Checklist deleted!");
				else alert("Failed to delete checklist.");
				getChecklists();
			})
			.catch((error) => alert(error));
	};

	const createChecklist = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const checklistData = { title };
      console.log("Sending data:", checklistData);

      const response = await api.post("/api/checklists/", checklistData);
      if (response.status === 201) {
        setTitle("");
        console.log("Checklist created successfully!");
        getChecklists();
      } else {
        setError("Unexpected response when creating checklist");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error("Create error:", axiosError.response?.data);
      setError(`Failed to create checklist: ${axiosError.message}`);
    }
  };

	return (
		<div>
			<h2>Checklists</h2>
				<div id='checklist-container'>
								{checklists.map((checklist) => (
												<Checklist checklist={checklist} onDelete={deleteChecklist} onItemAdded={getChecklists} key={checklist.id} />
								))}
				</div>
				<h2>Create a Checklist </h2>
				<form onSubmit={createChecklist}>
								<label htmlFor="title">Title:</label>
								<br />
								<input
												type="text"
												id="title"
												name="title"
												required
												onChange={(e) => setTitle(e.target.value)}
												value={title}
								/>

								<br />
								<input type="submit" value="Submit"></input>
				</form>
			</div>
);
}

export default Home;
