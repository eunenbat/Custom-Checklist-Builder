//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
// import "/styles/App.css";
// import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorNotFound from "./pages/ErrorNotFound";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";
// import { Checklist } from './Checklist';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
function RegisterUser() {
  localStorage.clear();
  return <Register />;
}
function App() {
  //const [count, setCount] = useState(0)

  // const addCheckList = () => {};
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="*" element={<ErrorNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
