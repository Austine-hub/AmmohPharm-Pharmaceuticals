//src/components/header/Header.tsx

'use client';

import { FC, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Menu, Search, Phone, Heart, X, User, ShoppingBag } from 'lucide-react';
import styles from './Header.module.css';
import { useCartCount, useCartSubtotal } from '@/context/CartContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen?: boolean;
}

const Header: FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalItems = useCartCount();
  const subtotal = useCartSubtotal();

    const formattedPrice = useMemo(() => 
    new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(subtotal),
    [subtotal]
  );

  const cartAriaLabel = useMemo(() => 
    `Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}, total ${formattedPrice}`,
    [totalItems, formattedPrice]
  );

   const displayBadge = totalItems > 99 ? '99+' : totalItems;

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
              <span className={styles.brandTagline}>caring beyond prescriptions</span>
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

{/* Actions Section - Desktop & Tablet */}
        <nav className={styles.actionsSection} aria-label="User actions">
          {/* Wishlist - Hidden on Mobile */}
          <Link
            href="/wishlist"
            className={styles.actionButton}
            aria-label="View wishlist"
            title="Wishlist"
          >
            <Heart size={24} />
          </Link>


          {/* Account - Hidden on Mobile */}
          <Link
            href="/auth/login"
            className={styles.actionButton}
            aria-label="Sign in to your account"
            title="Account"
          >
            <User size={24} />
            <div className={styles.accountInfo}>
              <span className={styles.accountLabel}>Sign In</span>
              <span className={styles.accountSubLabel}>Account</span>
            </div>
          </Link>

          {/* Cart - Always Visible, Next to Menu on Mobile */}
          <Link
            href="/cart"
            className={styles.cartButton}
            aria-label={cartAriaLabel}
            title="View Cart"
          >
            <div className={styles.cartIconWrapper}>
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {displayBadge}
                </span>
              )}
            </div>
            <div className={styles.cartPriceWrapper}>
              <span className={styles.cartPrice}>{formattedPrice}</span>
            </div>
          </Link>


            </nav>

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