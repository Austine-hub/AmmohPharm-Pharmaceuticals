//src/components/header/Header.tsx

'use client';

import { FC, useEffect, useState, useCallback, useRef } from 'react';
import { Menu, X, Search, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen?: boolean;
}

const Header: FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isMenuOpen]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search navigation: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery]);

  const handleMenuToggle = useCallback(() => {
    if (isMobile) {
      onMenuToggle();
    }
  }, [isMobile, onMenuToggle]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  }, []);

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} 
      role="banner"
    >
      {/* Top Bar - Emergency & Info */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLeft}>
            <MapPin size={14} aria-hidden="true" />
            <span>Serving Juja, Kiambu County</span>
          </div>
          <div className={styles.topBarRight}>
            <span className={styles.emergencyText}>24/7 Emergency Service Available</span>
            <span className={styles.separator}>|</span>
            <Link href="/contact" className={styles.topBarLink}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          {/* Logo Section */}
          <Link href="/" className={styles.logo} aria-label="AMMOHPharm Home">
            <div className={styles.logoIcon} aria-hidden="true">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="12" fill="#0071dc"/>
                <path 
                  d="M24 14L16 18V30L24 34L32 30V18L24 14Z" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="24" r="4" fill="white"/>
                <path 
                  d="M24 20V28M20 24H28" 
                  stroke="#0071dc" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandName}>AMMOHPharm</span>
              <span className={styles.brandTagline}>Healthcare Solutions</span>
            </div>
          </Link>

          {/* Navigation Section */}
          <nav className={styles.nav} aria-label="Main navigation">
            {/* Search Container - Desktop */}
            <form 
              className={styles.searchContainer} 
              onSubmit={handleSearch}
              role="search"
            >
              <div className={styles.searchWrapper}>
                <Search 
                  size={18} 
                  className={styles.searchIcon} 
                  aria-hidden="true"
                />
                <input 
                  ref={searchInputRef}
                  type="search" 
                  placeholder="Search medications, products..." 
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products and medications"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button 
                type="submit"
                className={styles.searchBtn} 
                aria-label="Submit search"
              >
                <Search size={20} strokeWidth={2.5} />
                <span className={styles.searchBtnText}>Search</span>
              </button>
            </form>

            {/* Contact Section - Desktop */}
            <div className={styles.contactSection}>
              <Link href="tel:0796787207" className={styles.contact}>
                <div className={styles.contactIconWrapper}>
                  <Phone size={20} className={styles.contactIcon} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Customer Support</span>
                  <span className={styles.contactNumber}>0796787207</span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              disabled={!isMobile}
            >
              {isMenuOpen ? (
                <X size={28} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu size={28} strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobile && (
        <div className={styles.mobileSearchContainer}>
          <form 
            className={styles.mobileSearchForm} 
            onSubmit={handleSearch}
            role="search"
          >
            <Search size={18} className={styles.mobileSearchIcon} aria-hidden="true" />
            <input 
              type="search" 
              placeholder="Search medications..." 
              className={styles.mobileSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.mobileClearBtn}
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;