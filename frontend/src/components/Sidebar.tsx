import { useState } from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  //const [ount, setCount] = useState(0)
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div id="sidebarContainer">
      <button onClick={() => setCollapsed(!collapsed)} id="sidebarBtn">
        HIDE
      </button>

      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <li>
          hello
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
