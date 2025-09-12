import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <a
        href="https://www.dauniv.ac.in/"
        target="_blank"
        rel="noreferrer"
        className="footer-text"
        style={{ marginLeft: '50px', display: 'flex', alignItems: 'center' }}
      >
        <img src="/assets/favicon.ico" alt="Davv Logo" className="footer-logo" />
        <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>IIPS</span>
      </a>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
      </div>

      {/* Links */}
      <div className={`navbar-container ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-links">
          {location.pathname === '/' ? (
            <Link className="navbar-brand" to={isAuthenticated ? '/dashboard' : '/login'} onClick={closeMenu}>
              Academics
            </Link>
          ) : (
            <Link className="navbar-brand" to="/" onClick={closeMenu}>
              Home
            </Link>
          )}

          <Link className="navbar-brand" to="/placement" onClick={closeMenu}>
            Placement
          </Link>
          <Link className="navbar-brand" to="/events" onClick={closeMenu}>
            Events
          </Link>
          <Link className="navbar-brand" to="/aboutus" onClick={closeMenu}>
            About
          </Link>
          <Link className="navbar-brand" to="/our-contributers" onClick={closeMenu}>
            Contributors
          </Link>
        </div>

        {/* User Section */}
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
                <Link className="btnNew" to="/login" onClick={closeMenu}>
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btnNew" to="/Register" onClick={closeMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
