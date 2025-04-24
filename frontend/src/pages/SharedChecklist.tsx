import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import "../styles/SharedChecklist.css";

function SharedChecklistView() {
  const { uuid } = useParams();
  const [checklist, setChecklist] = useState<any | null>(null);

  useEffect(() => {
    async function fetchChecklist() {
      try {
        const res = await api.get(`/api/shared/${uuid}/`);
        setChecklist(res.data);
      } catch (err) {
        console.error("Failed to fetch checklist:", err);
      }
    }
    fetchChecklist();
  }, [uuid]);

  const toggleCompletion = async (itemId: number, isCompleted: boolean) => {
    try {
      await api.patch(`/api/shared/items/${itemId}/`, {
        is_completed: isCompleted,
      });
      // Refresh
      const res = await api.get(`/api/shared/${uuid}/`);
      setChecklist(res.data);
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  if (!checklist) return <p>Checklist not found.</p>;

  return (
    <div className="sharedChecklist">
      <h2>{checklist.title}</h2>
      <ul>
        {checklist.items.map((item: any) => (
          <li key={item.id}>
            <input
            className="itemCheckbox"
              type="checkbox"
              checked={item.is_completed}
              onChange={() => toggleCompletion(item.id, !item.is_completed)}
            />
            <div className="inputValue">

            {item.value}
            </div>
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

								</div>
							))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SharedChecklistView;
