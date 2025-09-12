import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <a
          href="https://www.dauniv.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="navbar-logo"
        >
          <img src="/assets/favicon.ico" alt="Davv Logo" className="footer-logo" />
          IIPS
        </a>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}  
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Menu (desktop + mobile drawer) */}
        <div ref={menuRef} className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {location.pathname === "/" ? (
            <Link to={isAuthenticated ? "/dashboard" : "/login"} onClick={handleLinkClick}>
              Academics
            </Link>
          ) : (
            <Link to="/" onClick={handleLinkClick}>Home</Link>
          )}
          <Link to="/placement" onClick={handleLinkClick}>Placement</Link>
          <Link to="/events" onClick={handleLinkClick}>Events</Link>
          <Link to="/aboutus" onClick={handleLinkClick}>About</Link>
          <Link to="/our-contributers" onClick={handleLinkClick}>Contributors</Link>

          {/* Auth Section */}
          <div className="auth-links">
            {isAuthenticated ? (
              <p className="user-welcome">
                <span className="user-name">{user.displayName?.toUpperCase()}</span>
                <img className="user-icon" src="/assets/user-icon.png" alt="Admin" />
              </p>
            ) : (
              <>
                <Link to="/login" className="btnNew" onClick={handleLinkClick}>
                  Sign In
                </Link>
                <Link to="/register" className="btnNew" onClick={handleLinkClick}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Overlay when menu is open */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Navbar;
