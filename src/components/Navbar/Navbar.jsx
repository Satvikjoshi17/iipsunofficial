import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
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

  // Close menu when navigating
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <a
        href="https://www.dauniv.ac.in/"
        target="_blank"
        rel="noreferrer"
        className="footer-text"
        style={{ marginLeft: "20px" }}
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

      {/* Navbar Links */}
      <div
        ref={menuRef}
        className={`navbar-container ${menuOpen ? "open" : ""}`}
      >
        <div className="navbar-links">
          {location.pathname === "/" ? (
            <Link className="navbar-brand" to={isAuthenticated ? "/dashboard" : "/login"} onClick={handleLinkClick}>
              Academics
            </Link>
          ) : (
            <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
              Home
            </Link>
          )}
          <Link className="navbar-brand" to="/placement" onClick={handleLinkClick}>
            Placement
          </Link>
          <Link className="navbar-brand" to="/events" onClick={handleLinkClick}>
            Events
          </Link>
          <Link className="navbar-brand" to="/aboutus" onClick={handleLinkClick}>
            About
          </Link>
          <Link className="navbar-brand" to="/our-contributers" onClick={handleLinkClick}>
            Contributors
          </Link>
        </div>
      </div>

      {/* Auth Section */}
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
              <Link className="btnNew" to="/login" onClick={handleLinkClick}>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btnNew" to="/Register" onClick={handleLinkClick}>
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
