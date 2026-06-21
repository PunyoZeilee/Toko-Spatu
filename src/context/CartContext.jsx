import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Tambah item ke keranjang
  function tambahKeKeranjang(sepatu, ukuran, jumlah) {
    setCartItems((prevItems) => {
      // Cek apakah sepatu dengan ukuran yang sama sudah ada di keranjang
      const itemAdaIndex = prevItems.findIndex(
        (item) => item.id === sepatu.id && item.ukuranDipilih === ukuran
      );

      if (itemAdaIndex !== -1) {
        // Kalau sudah ada, tambah jumlahnya saja
        const itemsBaru = [...prevItems];
        itemsBaru[itemAdaIndex].jumlah += jumlah;
        return itemsBaru;
      } else {
        // Kalau belum ada, tambahkan sebagai item baru
        return [
          ...prevItems,
          { ...sepatu, ukuranDipilih: ukuran, jumlah: jumlah },
        ];
      }
    });
  }

  // Hapus item dari keranjang
  function hapusDariKeranjang(id, ukuran) {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.ukuranDipilih === ukuran)
      )
    );
  }

  // Ubah jumlah item
  function ubahJumlah(id, ukuran, jumlahBaru) {
    if (jumlahBaru < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.ukuranDipilih === ukuran
          ? { ...item, jumlah: jumlahBaru }
          : item
      )
    );
  }

  // Kosongkan keranjang (setelah checkout berhasil)
  function kosongkanKeranjang() {
    setCartItems([]);
  }

  // Hitung total harga
  const totalHarga = cartItems.reduce(
    (total, item) => total + item.harga * item.jumlah,
    0
  );

  // Hitung total jumlah item
  const totalItem = cartItems.reduce((total, item) => total + item.jumlah, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        tambahKeKeranjang,
        hapusDariKeranjang,
        ubahJumlah,
        kosongkanKeranjang,
        totalHarga,
        totalItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}