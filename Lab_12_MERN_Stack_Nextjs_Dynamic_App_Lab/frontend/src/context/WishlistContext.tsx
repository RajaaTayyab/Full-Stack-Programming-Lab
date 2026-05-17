'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlist: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.wishlist) setWishlist(user.wishlist);
  }, [user]);

  const toggle = async (productId: string) => {
    if (!user) { toast.error('Please login to save items'); return; }
    try {
      const { data } = await api.post(`/users/wishlist/${productId}`);
      setWishlist(data.wishlist);
      const isNowWishlisted = data.wishlist.includes(productId);
      toast.success(isNowWishlisted ? 'Added to wishlist' : 'Removed from wishlist');
    } catch { toast.error('Failed to update wishlist'); }
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);