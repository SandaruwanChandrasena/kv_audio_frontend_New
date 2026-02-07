import { Routes, Route } from "react-router-dom";

import Navbar from "../../components/common/Navbar.jsx";
import Footer from "../../components/common/Footer.jsx";

import Home from "./Home.jsx";
import Products from "./Products.jsx";
import ProductDetails from "./ProductDetails.jsx";

export default function PublicPage() {
  return (
    <div className="relative z-0 min-h-screen bg-transparent text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-1 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:key" element={<ProductDetails />} />
          <Route path="*" element={<div className="text-slate-500">Page not found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
