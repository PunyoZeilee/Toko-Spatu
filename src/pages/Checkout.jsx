import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cartItems, totalHarga, kosongkanKeranjang } = useCart();

  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    kota: "",
    kodePos: "",
    telepon: "",
  });
  const [metodeBayar, setMetodeBayar] = useState("transfer");
  const [sedangProses, setSedangProses] = useState(false);
  const [berhasil, setBerhasil] = useState(false);

  function formatHarga(angka) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleBayar(e) {
    e.preventDefault();

    if (!form.nama || !form.alamat || !form.kota || !form.kodePos || !form.telepon) {
      alert("Mohon lengkapi semua data pengiriman.");
      return;
    }

    setSedangProses(true);

    setTimeout(() => {
      setSedangProses(false);
      setBerhasil(true);
      kosongkanKeranjang();
    }, 2000);
  }

  const ongkir = 20000;
  const grandTotal = totalHarga + ongkir;

  if (berhasil) {
    return (
      <div className="checkout-container">
        <div className="sukses-box">
          <p className="sukses-icon">✅</p>
          <h1>Pembayaran Berhasil!</h1>
          <p>
            Terima kasih, {form.nama}. Pesananmu sedang kami proses dan akan
            segera dikirim ke {form.alamat}, {form.kota}.
          </p>
          <Link to="/" className="belanja-lagi-btn">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <p>Keranjang kosong, tidak ada yang bisa dicheckout.</p>
        <Link to="/" className="belanja-lagi-btn">
          Kembali Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-wrapper">
        <form onSubmit={handleBayar} className="checkout-form">
          <h3>Data Pengiriman</h3>

          <input
            name="nama"
            placeholder="Nama Penerima"
            value={form.nama}
            onChange={handleChange}
            className="checkout-input"
          />
          <input
            name="alamat"
            placeholder="Alamat Lengkap"
            value={form.alamat}
            onChange={handleChange}
            className="checkout-input"
          />
          <input
            name="kota"
            placeholder="Kota"
            value={form.kota}
            onChange={handleChange}
            className="checkout-input"
          />
          <input
            name="kodePos"
            placeholder="Kode Pos"
            value={form.kodePos}
            onChange={handleChange}
            className="checkout-input"
          />
          <input
            name="telepon"
            placeholder="Nomor Telepon"
            value={form.telepon}
            onChange={handleChange}
            className="checkout-input"
          />

          <h3 style={{ marginTop: "10px" }}>Metode Pembayaran</h3>
          <div className="metode-wrapper">
            {[
              { value: "transfer", label: "Transfer Bank" },
              { value: "ewallet", label: "E-Wallet" },
              { value: "cod", label: "Bayar di Tempat (COD)" },
            ].map((m) => (
              <label key={m.value} className="metode-label">
                <input
                  type="radio"
                  name="metode"
                  value={m.value}
                  checked={metodeBayar === m.value}
                  onChange={() => setMetodeBayar(m.value)}
                />
                {m.label}
              </label>
            ))}
          </div>

          <button type="submit" disabled={sedangProses} className="bayar-btn">
            {sedangProses ? "MEMPROSES..." : `BAYAR ${formatHarga(grandTotal)}`}
          </button>
        </form>

        <div className="ringkasan-box">
          <h3>Ringkasan Pesanan</h3>
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.ukuranDipilih}`} className="ringkasan-item">
              <span>
                {item.nama} ({item.ukuranDipilih}) x{item.jumlah}
              </span>
              <span>{formatHarga(item.harga * item.jumlah)}</span>
            </div>
          ))}
          <div className="ringkasan-garis"></div>
          <div className="ringkasan-item">
            <span>Subtotal</span>
            <span>{formatHarga(totalHarga)}</span>
          </div>
          <div className="ringkasan-item">
            <span>Ongkos Kirim</span>
            <span>{formatHarga(ongkir)}</span>
          </div>
          <div className="ringkasan-garis"></div>
          <div className="ringkasan-item ringkasan-total">
            <span>Total</span>
            <span>{formatHarga(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;