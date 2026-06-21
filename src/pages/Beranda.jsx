import dataSepatu from "../data/sepatu";
import CardProduk from "../components/CardProduk";
import "./Beranda.css";

function Beranda() {
  return (
    <div>
      <section className="hero">
        <div>
          <p className="hero-eyebrow">KICKS & CO. — SEJAK 2026</p>
          <h1 className="hero-title">Langkah Pertamamu, Gaya Seumur Hidup</h1>
          <p className="hero-sub">
            Koleksi sneakers original dari brand-brand terpercaya, dikurasi
            untuk yang serius soal apa yang dipakai di kaki.
          </p>
        </div>
        <div className="hero-stamp">100% ORIGINAL · GARANSI RESMI</div>
      </section>

      <div className="section-divider"></div>

      <div className="section-header">
        <p className="section-eyebrow">KATALOG</p>
        <h2 className="section-title">Koleksi Sepatu Kami</h2>
      </div>

      <div className="produk-grid">
        {dataSepatu.map((sepatu) => (
          <CardProduk key={sepatu.id} sepatu={sepatu} />
        ))}
      </div>
    </div>
  );
}

export default Beranda;