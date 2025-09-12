import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <a
        href="https://www.dauniv.ac.in/"
        target="_blank"
        rel="noreferrer"
        className="footer-text"
        style={{ marginLeft: "50px" }}
      >
        <img src="/assets/favicon.ico" alt="Davv Logo" className="footer-logo" />{" "}
        IIPS
      </a>

      {/* Hamburger Button */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Side Panel Menu */}
      <div className={`side-menu ${menuOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ✕
        </button>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setMenuOpen(false)}>
          Academics
        </Link>
        <Link to="/placement" onClick={() => setMenuOpen(false)}>
          Placement
        </Link>
        <Link to="/events" onClick={() => setMenuOpen(false)}>
          Events
        </Link>
        <Link to="/aboutus" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link to="/our-contributers" onClick={() => setMenuOpen(false)}>
          Contributors
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="navbar-container">
        <div className="navbar-links">
          {location.pathname === "/" ? (
            <Link className="navbar-brand" to={isAuthenticated ? "/dashboard" : "/login"}>
              Academics
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              Home
            </Link>
          )}
          <Link className="navbar-brand" to="/placement">
            Placement
          </Link>
          <Link className="navbar-brand" to="/events">
            Events
          </Link>
          <Link className="navbar-brand" to="/aboutus">
            About
          </Link>
          <Link className="navbar-brand" to="/our-contributers">
            Contributors
          </Link>
        </div>
      </div>

      {/* Auth Buttons */}
      <ul className="navbar-nav">
        {isAuthenticated ? (
          <li className="nav-item">
            <p className="user-welcome">
              <span className="user-name">{user.displayName?.toUpperCase()}</span>
              <img className="user-icon" src="/assets/user-icon.png" alt="Admin" />
            </p>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="btnNew" to="/login" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btnNew" to="/Register" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Overlay (click outside to close) */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
