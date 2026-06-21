import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dataSepatu from "../data/sepatu";
import { useCart } from "../context/CartContext";
import "./DetailProduk.css";

function DetailProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tambahKeKeranjang } = useCart();

  const sepatu = dataSepatu.find((item) => item.id === parseInt(id));

  const [ukuranDipilih, setUkuranDipilih] = useState(null);
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");

  if (!sepatu) {
    return <p className="detail-container">Produk tidak ditemukan.</p>;
  }

  const hargaFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(sepatu.harga);

  function handleTambahKeranjang() {
    if (!ukuranDipilih) {
      setPesan("Silakan pilih ukuran terlebih dahulu.");
      return;
    }
    tambahKeKeranjang(sepatu, ukuranDipilih, jumlah);
    setPesan("Berhasil ditambahkan ke keranjang!");
  }

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="detail-back">
        ← Kembali
      </button>

      <div className="detail-wrapper">
        <div className="detail-img-box">
          <img src={sepatu.gambar} alt={sepatu.nama} className="detail-img" />
          <div className="detail-tag">
            SKU-{String(sepatu.id).padStart(3, "0")}
          </div>
        </div>

        <div className="detail-info">
          <p className="detail-merk">{sepatu.merk}</p>
          <h1 className="detail-nama">{sepatu.nama}</h1>
          <p className="detail-harga">{hargaFormat}</p>
          <p className="detail-deskripsi">{sepatu.deskripsi}</p>
          <p className="detail-stok">STOK TERSEDIA: {sepatu.stok}</p>

          <p className="detail-label">Pilih Ukuran</p>
          <div className="ukuran-wrapper">
            {sepatu.ukuran.map((uk) => (
              <button
                key={uk}
                onClick={() => setUkuranDipilih(uk)}
                className={`ukuran-btn ${ukuranDipilih === uk ? "aktif" : ""}`}
              >
                {uk}
              </button>
            ))}
          </div>

          <p className="detail-label">Jumlah</p>
          <div className="jumlah-wrapper">
            <button
              onClick={() => setJumlah((j) => Math.max(1, j - 1))}
              className="jumlah-btn"
            >
              −
            </button>
            <span className="jumlah-text">{jumlah}</span>
            <button onClick={() => setJumlah((j) => j + 1)} className="jumlah-btn">
              +
            </button>
          </div>

          <button onClick={handleTambahKeranjang} className="btn-primary mt-lg">
            Tambah ke Keranjang
          </button>

          {pesan && <p className="pesan-info">{pesan}</p>}
        </div>
      </div>
    </div>
  );
}

export default DetailProduk;