import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Rustik Plank — Handcrafted Wood Furniture',
  description: 'Discover our collection of handcrafted, sustainable wood furniture and home décor.',
  keywords: 'wood furniture, handcrafted, sustainable, reclaimed wood, home décor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    fontFamily: 'var(--font-jost)',
                    background: '#1c1c1c',
                    color: '#faf7f2',
                    borderRadius: '0',
                    border: '1px solid #8a4d21',
                  },
                }}
              />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}