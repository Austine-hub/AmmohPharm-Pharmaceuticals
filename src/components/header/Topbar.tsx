import { useState } from 'react';
import styles from './Topbar.module.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <svg 
            viewBox="0 0 260 130" 
            className={styles.logoSvg}
            aria-labelledby="logoTitle"
            role="img"
          >
            <title id="logoTitle">Preston's Pharmacy - Since 1934</title>
            
            {/* Preston's text */}
            <text x="35" y="65" className={styles.prestonsText}>Preston's</text>
            
            {/* PHARMACY text */}
            <text x="58" y="95" className={styles.pharmacyText}>PHARMACY</text>
            
            {/* SINCE 1934 text */}
            <text x="98" y="122" className={styles.sinceText}>SINCE 1934</text>
          </svg>
        </div>

        <button 
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><a href="#services">Services</a></li>
            <li><a href="#compounding">Compounding</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#faqs">FAQs</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#shop">Shop</a></li>
          </ul>
          <a href="#provider-login" className={styles.loginBtn}>
            Provider LOGIN
          </a>
        </nav>
      </div>
    </header>
  );
}