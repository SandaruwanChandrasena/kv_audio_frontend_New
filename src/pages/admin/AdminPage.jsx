import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Products from "./Products";

export default function AdminPage() {
  return (
    <>
      {/* Admin Header */}
      <header className="p-4 border-b bg-slate-900 text-white flex gap-4">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/products">Products</Link>
      </header>

      {/* Admin Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<div>Admin page not found</div>} />
      </Routes>
    </>
  );
}
