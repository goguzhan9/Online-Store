import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const NAV_ID = "mainNavigation";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-primary py-3">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand fw-semibold">
          My Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Menüyü aç"
          aria-expanded={isMenuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-controls={NAV_ID}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <nav
          className={`collapse navbar-collapse ${
            isMenuOpen ? "show" : ""
          } justify-content-end`}
          id={NAV_ID}
        >
          <ul className="navbar-nav align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                onClick={closeMenu}
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link position-relative${isActive ? " active" : ""}`
                }
                onClick={closeMenu}
              >
                Cart
                {cartCount > 0 ? (
                  <span className="badge bg-light text-primary ms-2">
                    {cartCount}
                  </span>
                ) : null}
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `btn btn-outline-light${isActive ? " active" : ""}`
                  }
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-light text-primary"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
