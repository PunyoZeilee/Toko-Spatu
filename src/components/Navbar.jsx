import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { totalItem } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Kicks & Co.
      </Link>
      <Link to="/keranjang" className="navbar-cart">
        Keranjang
        {totalItem > 0 && <span className="navbar-badge">{totalItem}</span>}
      </Link>
    </nav>
  );
}

export default Navbar;