
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorNotFound from "./pages/ErrorNotFound";
import Home from "./pages/Home";
import SharedChecklistView from "./pages/SharedChecklist";

import ProtectedRoute from "./components/ProtectedRoute";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
function RegisterUser() {
  localStorage.clear();
  return <Register />;
}
function App() {

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

        <Route path="/shared/:uuid" element={<SharedChecklistView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="*" element={<ErrorNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
