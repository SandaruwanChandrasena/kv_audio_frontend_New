import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

import Dashboard from "./Dashboard.jsx";
import Users from "./Users.jsx";
import Products from "./Products.jsx";

function Rentals() {
  return <div>Rentals (coming soon)</div>;
}
function Returns() {
  return <div>Returns (coming soon)</div>;
}

export default function AdminPage() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="rentals" element={<Rentals />} />
        <Route path="returns" element={<Returns />} />
        <Route path="*" element={<div>Admin page not found</div>} />
      </Route>
    </Routes>
  );
}
