import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import PublicPage from "./pages/public/PublicPage";
import AdminPage from "./pages/admin/AdminPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AnimatedBackground from "./components/common/AnimatedBackground";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        {/* background behind everything */}
        <AnimatedBackground />

        {/* content above background */}
        <div className="relative z-10">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<PublicPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
