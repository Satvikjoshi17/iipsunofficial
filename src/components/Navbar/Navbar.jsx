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
        style={{ marginLeft: "20px" }}
      >
        <img src="/assets/favicon.ico" alt="Davv Logo" className="footer-logo" />{" "}
        IIPS
      </a>

      {/* Hamburger (only visible on mobile) */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Links (same set for desktop + mobile) */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {location.pathname === "/" ? (
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>Academics</Link>
        ) : (
          <Link to="/">Home</Link>
        )}
        <Link to="/placement">Placement</Link>
        <Link to="/events">Events</Link>
        <Link to="/aboutus">About</Link>
        <Link to="/our-contributers">Contributors</Link>

        {/* Auth buttons */}
        {isAuthenticated ? (
          <p className="user-welcome">
            <span className="user-name">{user.displayName?.toUpperCase()}</span>
            <img className="user-icon" src="/assets/user-icon.png" alt="Admin" />
          </p>
        ) : (
          <div className="auth-btns">
            <Link className="btnNew" to="/login">
              Sign In
            </Link>
            <Link className="btnNew" to="/register">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Overlay for mobile (click outside to close) */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
