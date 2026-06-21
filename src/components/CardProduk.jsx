import { Link } from "react-router-dom";
import "./CardProduk.css";

function CardProduk({ sepatu }) {
  const hargaFormat = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(sepatu.harga);

  const ukuranMin = Math.min(...sepatu.ukuran);
  const ukuranMax = Math.max(...sepatu.ukuran);

  return (
    <div className="card-produk">
      <div className="card-img-wrapper">
        <img src={sepatu.gambar} alt={sepatu.nama} className="card-img" />
        <div className="card-tag">
          SKU-{String(sepatu.id).padStart(3, "0")} · EU {ukuranMin}–{ukuranMax}
        </div>
      </div>
      <div className="card-content">
        <p className="card-merk">{sepatu.merk}</p>
        <h3 className="card-nama">{sepatu.nama}</h3>
        <p className="card-harga">{hargaFormat}</p>
        <Link to={`/produk/${sepatu.id}`} className="btn-primary btn-block">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default CardProduk;