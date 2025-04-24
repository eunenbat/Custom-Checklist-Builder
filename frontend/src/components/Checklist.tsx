// import { useState } from "react";
import "../styles/Checklist.css";
import api from "../api";
import { useState } from "react";
import Modal from "../components/Modal";

function Checklist({
	checklist,
	onDelete,
	onItemAdded,
}: {
	checklist: {
		id: string;
		title: string;
		date: string;
		share_uuid: string;
		items?: Array<{
			id: number;
			value: string;
			is_completed: boolean;
			files?: Array<{
				file: {
					id: number;
				};
			}>;
		}>;
	};
	onDelete: (id: string) => void;
	onItemAdded: () => void;
}) {
	const [showItemInput, setShowItemInput] = useState(false);
	const [itemText, setItemText] = useState("");
	const [files, setFiles] = useState<FileList | null>(null);

	const handleAddItem = async () => {
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
			onItemAdded();
		} catch (err) {
			console.error("Error adding item or uploading files:", err);
		}
	};

	const toggleCompletion = async (itemId: number, isCompleted: boolean) => {
		try {
			await api.patch(`/api/items/update/${itemId}/`, {
				is_completed: isCompleted,
			});
			onItemAdded();
		} catch (err) {
			console.error("Toggle error:", err);
		}
	};

	const updateItemValue = async (itemId: number, newValue: string) => {
		try {
			await api.patch(`/api/items/update/${itemId}/`, { value: newValue });
			onItemAdded();
		} catch (err) {
			console.error("Update error:", err);
		}
	};

	const deleteItem = async (itemId: number) => {
		try {
			await api.delete(`/api/items/delete/${itemId}/`);
			onItemAdded();
		} catch (err) {
			console.error("Delete error:", err);
		}
	};

	const handleDeleteFile = async (fileId: number) => {
		try {
			await api.delete(`/api/files/${fileId}/`);
			onItemAdded();
		} catch (err) {
			console.error("Failed to delete file:", err);
		}
	};

	return (
		<div className="checklist">
			<div className="checkTop">
				<h3 className="checklist-title">{checklist.title}</h3>
				<button
					onClick={() => {
						navigator.clipboard.writeText(
							`${window.location.origin}/shared/${checklist.share_uuid}`,
						);
						alert("Link copied to clipboard!");
					}}
				>
					 Share
				</button>
				<button
					className="checklistDeleteBtn"
					onClick={() => onDelete(checklist.id)}
				>
					X
				</button>
			</div>
			<div className="checkItems">
				<ul className="checklist-items">
					{checklist.items?.map((item) => (
						<li key={item.id}>
							<input
								className="itemCheckbox"
								type="checkbox"
								checked={item.is_completed}
								onChange={() => toggleCompletion(item.id, !item.is_completed)}
							/>
							<input
								type="text"
								value={item.value}
								onChange={(e) => updateItemValue(item.id, e.target.value)}
							/>
							{item.files?.map((file) => (
								<div key={file.id} className="item-file">
									<a
										href={file.file}
										target="_blank"
										rel="noreferrer"
										title={file.file.split("/").pop()}
									>
										📄
									</a>
									<button
										className="fileDeleteBtn"
										onClick={() => handleDeleteFile(file.id)}
									>
										x
									</button>
								</div>
							))}
							<button
								className="deleteItemBtn"
								onClick={() => deleteItem(item.id)}
							>
								🗑
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className="checkBottom">
				<button className="addItemBtn" onClick={() => setShowItemInput(true)}>
					Add Item
				</button>

				{showItemInput && (
					<Modal onClose={() => setShowItemInput(false)}>
						<h4>Add New Item</h4>
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
						<div className="modal-buttons">
							<button onClick={handleAddItem} className="submit-item-btn">
								Add
							</button>
							<button
								onClick={() => setShowItemInput(false)}
								className="cancel-btn"
							>
								Cancel
							</button>
						</div>
					</Modal>
				)}
				<p className="checklist-date">Created {checklist.date}</p>
			</div>
		</div>
	);
}

export default Checklist;
