import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import DetailProduk from "./pages/DetailProduk";
import Keranjang from "./pages/Keranjang";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/produk/:id" element={<DetailProduk />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App; 