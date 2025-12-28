// src/app/ClientProviders.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/footer/Footer";
import BottomNav from "@/components/footer/BottomNav";
import Loader from "@/components/common/Loader";

// Corrected Imports
import Header from "@/components/header/Header";
import Navbar from "@/components/header/Navbar";
import { CompareProvider } from "@/context/CompareContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  
  // State to control the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    // Close menu automatically on route change
    setIsMenuOpen(false); 
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
        <Toaster position="top-center" />

        {loading && <Loader mode="fullscreen" />}

        {/* Pass the state and functions as props */}
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
        <Navbar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <main>{children}</main>

        <Footer />
        <BottomNav />
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
