import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
// import App from "./components/App.tsx";
import Titlebar from "./components/Titlebar.tsx";
import Sidebar from "./components/Sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Titlebar />
    <div id='mainContainer'>
      <Sidebar />
      {/* <App /> */}
    </ div>
  </StrictMode>,
);
