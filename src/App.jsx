import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PublicPage from "./pages/public/PublicPage";
import AdminPage from "./pages/admin/AdminPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* common */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* admin side */}
        <Route path="/admin/*" element={<AdminPage />} />

        {/* user side (catch-all) */}
        <Route path="/*" element={<PublicPage />} />
      </Routes>
    </BrowserRouter>
  );
}
