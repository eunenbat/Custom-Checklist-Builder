import { useState, useEffect } from "react";
import api from "../api";
import Checklist from "../components/Checklist";
// import "./Checklist.css";
// interface Checklist {
//   id: number;
//   title: string;
//   date: string;
// }
function Home() {
	const [checklists, setChecklists] = useState([]);
	const [title, setTitle] = useState("");

 useEffect(() => {
    getChecklists();
  }, []);

	const getChecklists= () => {
		api
			.get("/api/checklists/")
			.then((res) => res.data)
			.then((data) => {
				setChecklists(data);
			})
			.catch((err) => alert(err));
	};

	const deleteChecklist= (id) => {
		api
			.delete(`/api/checklists/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert("Checklist deleted!");
				else alert("Failed to delete checklist.");
				getChecklists();
			})
			.catch((error) => alert(error));
	};

	const createChecklist= (e) => {
		e.preventDefault();
		api
			.post("/api/checklists/", { title })
			.then((res) => {
				if (res.status === 201) {
					// setTitle("");
					alert("Checklist created!");
				}
				else alert("Failed to make checklist.");
				getChecklists();
			})
			.catch((err) => alert(err));
	};

	return (
		<div>
            <div>
                <h2>Checklists</h2>
                {checklists.map((checklist) => (
                    <Checklist checklist={checklist} onDelete={deleteChecklist} key={checklist.id} />
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
