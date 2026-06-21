import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Keranjang.css";

function Keranjang() {
  const { cartItems, hapusDariKeranjang, ubahJumlah, totalHarga } = useCart();

  function formatHarga(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  }

  if (cartItems.length === 0) {
    return (
      <div className="keranjang-container">
        <h1>Keranjang Belanja</h1>
        <p className="keranjang-kosong">Keranjang kamu masih kosong.</p>
        <Link to="/" className="belanja-btn">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="keranjang-container">
      <h1>Keranjang Belanja</h1>

      <div className="keranjang-list">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.ukuranDipilih}`} className="keranjang-item">
            <img src={item.gambar} alt={item.nama} className="keranjang-img" />

            <div className="keranjang-info">
              <h3 className="keranjang-nama">{item.nama}</h3>
              <p className="keranjang-ukuran">UKURAN: {item.ukuranDipilih}</p>
              <p className="keranjang-harga">{formatHarga(item.harga)}</p>
            </div>

            <div className="keranjang-jumlah-wrapper">
              <button
                onClick={() => ubahJumlah(item.id, item.ukuranDipilih, item.jumlah - 1)}
                className="keranjang-jumlah-btn"
              >
                −
              </button>
              <span className="keranjang-jumlah-text">{item.jumlah}</span>
              <button
                onClick={() => ubahJumlah(item.id, item.ukuranDipilih, item.jumlah + 1)}
                className="keranjang-jumlah-btn"
              >
                +
              </button>
            </div>

            <p className="keranjang-subtotal">
              {formatHarga(item.harga * item.jumlah)}
            </p>

            <button
              onClick={() => hapusDariKeranjang(item.id, item.ukuranDipilih)}
              className="keranjang-hapus"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="keranjang-ringkasan">
        <p className="keranjang-total-text">
          Total: <strong>{formatHarga(totalHarga)}</strong>
        </p>
        <Link to="/checkout" className="checkout-btn">
          Lanjut ke Checkout
        </Link>
      </div>
    </div>
  );
}

export default Keranjang;