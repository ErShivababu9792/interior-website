import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="brand">SHIVA DESIGN STUDIO</div>

        <ul className="nav-links desktop-only">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="cta-button desktop-only">Get a Quote</a>

        <button className="menu-toggle mobile-only" onClick={() => setMenuOpen(true)}>
          <Menu size={24} color="#fff" />
        </button>
      </nav>

      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={closeMenu}>
          <X size={24} />
        </button>
        <ul className="sidebar-links">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={closeMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="sidebar-cta" onClick={closeMenu}>Get a Quote</a>
      </div>

      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  );
}