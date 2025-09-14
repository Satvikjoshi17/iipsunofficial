import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((s) => s.auth || {});
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const prevScroll = useRef(typeof window !== "undefined" ? window.pageYOffset : 0);
  const panelRef = useRef(null);

  // Close when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close when clicking outside panel (and only when open)
  useEffect(() => {
    const handler = (e) => {
      if (!menuOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Show navbar on scroll up, hide on scroll down
  useEffect(() => {
    const onScroll = () => {
      const current = window.pageYOffset;
      const previous = prevScroll.current;
      const tolerance = 10; // small tolerance to avoid flicker

      if (Math.abs(current - previous) <= tolerance) {
        // do nothing
      } else if (current > previous && current > 80) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }
      prevScroll.current = current;
    };
    // show again on scroll up 
      useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowNavbar(true); // scrolling up → show
      } else {
        setShowNavbar(false); // scrolling down → hide
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = (
    <>
      {location.pathname === "/" ? (
        <Link to={isAuthenticated ? "/dashboard" : "/login"} onClick={() => setMenuOpen(false)}>
          Academics
        </Link>
      ) : (
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
      )}
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
    </>
  );

  return (
    <>
      <header className={`navbar ${showNav ? "visible" : "hidden"}`}>
        <a
          href="https://www.dauniv.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="navbar-logo"
        >
          <img src="/assets/favicon.ico" alt="Davv Logo" className="footer-logo" />
          <span className="logo-text">IIPS</span>
        </a>

        {/* Desktop inline links */}
        <nav className="nav-desktop">{navLinks}</nav>

        {/* Auth (desktop) */}
        <div className="auth-desktop">
          {isAuthenticated ? (
            <div className="user-welcome">
              <span className="user-name">{(user?.displayName || "").toUpperCase()}</span>
              <img className="user-icon" src="/assets/user-icon.png" alt="user" />
            </div>
          ) : (
            <div className="auth-btns">
              <Link className="btnNew" to="/login">
                Sign In
              </Link>
              <Link className="btnNew outline" to="/register">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </header>

      {/* Overlay (mobile) */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      {/* Side panel (mobile) - single source of links */}
      <aside
        ref={panelRef}
        className={`side-panel ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button className="panel-close" onClick={() => setMenuOpen(false)} aria-label="Close">
          ✕
        </button>

        <div className="panel-links">{navLinks}</div>

        <div className="panel-auth">
          {isAuthenticated ? (
            <div className="user-welcome panel-user">
              <span className="user-name">{(user?.displayName || "").toUpperCase()}</span>
              <img className="user-icon" src="/assets/user-icon.png" alt="user" />
            </div>
          ) : (
            <div className="panel-auth-btns">
              <Link className="btnNew" to="/login" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link
                className="btnNew outline"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
