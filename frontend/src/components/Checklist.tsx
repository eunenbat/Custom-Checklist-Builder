// import { useState } from "react";
import "../styles/Checklist.css";
import api from "../api";
import { useState } from "react";

function Checklist({
	checklist,
	onDelete,
	onItemAdded,
}: {
	checklist: { id: string; title: string; date: string };
	onDelete: (id: string) => void;
	onItemAdded: () => void;
}) {
	const [showItemInput, setShowItemInput] = useState(false);
	const [itemText, setItemText] = useState("");
	const [files, setFiles] = useState<FileList | null>(null);
	// const [loading, setLoading] = useState(false);
	const handleAddItem = async () => {
		// if (!itemText.trim()) return;

		try {
			// Step 1: Create the item
			const res = await api.post("/api/items/", {
				checklist: checklist.id,
				value: itemText,
			});

			const itemId = res.data.id;

			// Step 2: Upload files if any
			if (files) {
				for (const file of Array.from(files)) {
					const formData = new FormData();
					formData.append("item", itemId.toString());
					formData.append("file", file);
					await api.post("/api/files/", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					});
				}
			}

			// Cleanup
			setItemText("");
			setFiles(null);
			setShowItemInput(false);
			onItemAdded(); // Tell parent to refresh checklist
		} catch (err) {
			console.error("Error adding item or uploading files:", err);
		} finally {
			// setLoading(false);
		}
	};
	return (
		<div className="checklist">
			<div className="checkTop">
				<h3 className="checklist-title">{checklist.title}</h3>
				{/* <p className="checklist-content">{checklist.content}</p> */}
				<button
					className="delete-button"
					onClick={() => onDelete(checklist.id)}
				>
					Delete
				</button>
			</div>
			<div className="checkItems">
				<ul>
					{checklist.items?.map((item) => <li key={item.id}>{item.value}</li>)}
				</ul>
				{showItemInput ? (
					<div className="item-input">
						<input
							type="text"
							placeholder="Item description"
							value={itemText}
							onChange={(e) => setItemText(e.target.value)}
							className="item-text-input"
						/>
						<input
							type="file"
							multiple
							onChange={(e) => setFiles(e.target.files)}
							className="item-file-input"
						/>
						<button
							onClick={handleAddItem}
							// disabled={loading}
							className="submit-item-btn"
						>
							Add
							{/* {loading ? "Adding..." : "Add"} */}
						</button>
					</div>
				) : (
					<button className="addItemBtn" onClick={() => setShowItemInput(true)}>
						+
					</button>
				)}
				{/* <button className="addItemBtn">+</button> */}
			</div>
			<div className="checkBottom">
				<p className="checklist-date">{checklist.date}</p>
			</div>
		</div>
	);
}

export default Checklist;
