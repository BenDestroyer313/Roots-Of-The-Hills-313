import React, { createContext, useState, ReactNode, useCallback } from 'react';
import type { User, Product, CartItem, Workshop } from '../types';
import { MOCK_USER, MOCK_MISSIONS } from '../constants';

interface AppContextType {
  currentUser: User | null;
  login: () => void;
  updateUser: (data: Partial<Pick<User, 'name' | 'avatar'>>) => void;
  toggleLanguage: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  followedArtisans: string[];
  toggleFollowArtisan: (artisanId: string) => void;
  claimMissionReward: (missionId: string) => void;
  claimedMissionIds: string[];
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  redeemWorkshopTicket: (workshop: Workshop) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod2']);
  const [followedArtisans, setFollowedArtisans] = useState<string[]>(['artisan1']);
  const [claimedMissionIds, setClaimedMissionIds] = useState<string[]>(['m1']);

  const login = useCallback(() => {
    setCurrentUser(MOCK_USER);
  }, []);

  const updateUser = useCallback((data: Partial<Pick<User, 'name' | 'avatar'>>) => {
    setCurrentUser(prevUser => (prevUser ? { ...prevUser, ...data } : null));
  }, []);

  const toggleLanguage = useCallback(() => {
    setCurrentUser(prevUser => 
      prevUser ? { ...prevUser, language: prevUser.language === 'en' ? 'hi' : 'en' } : null
    );
  }, []);
  
  const addCoins = useCallback((amount: number) => {
    setCurrentUser(prevUser => 
      prevUser ? { ...prevUser, coins: prevUser.coins + amount } : null
    );
  }, []);

  const spendCoins = useCallback((amount: number): boolean => {
    let success = false;
    setCurrentUser(prevUser => {
      if (prevUser && prevUser.coins >= amount) {
        success = true;
        return { ...prevUser, coins: prevUser.coins - amount };
      }
      return prevUser;
    });
    return success;
  }, []);

  const redeemWorkshopTicket = useCallback((workshop: Workshop) => {
    if (currentUser && workshop.priceInCoins && !currentUser.redeemedWorkshopIds.includes(workshop.id)) {
        if (spendCoins(workshop.priceInCoins)) {
            setCurrentUser(prevUser => prevUser ? { ...prevUser, redeemedWorkshopIds: [...prevUser.redeemedWorkshopIds, workshop.id] } : null);
        }
    }
  }, [currentUser, spendCoins]);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);
  
  const clearCart = useCallback(() => {
      setCart([]);
  }, [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);
  
  const toggleFollowArtisan = useCallback((artisanId: string) => {
    setFollowedArtisans(prev =>
      prev.includes(artisanId) ? prev.filter(id => id !== artisanId) : [...prev, artisanId]
    );
  }, []);

  const claimMissionReward = useCallback((missionId: string) => {
    if (currentUser && currentUser.completedMissionIds.includes(missionId) && !claimedMissionIds.includes(missionId)) {
      const mission = MOCK_MISSIONS.find(m => m.id === missionId);
      if (mission) {
        addCoins(mission.rewardPoints);
        setClaimedMissionIds(prev => [...prev, missionId]);
      }
    }
  }, [currentUser, claimedMissionIds, addCoins]);

  const value = {
    currentUser,
    login,
    updateUser,
    toggleLanguage,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    followedArtisans,
    toggleFollowArtisan,
    claimMissionReward,
    claimedMissionIds,
    addCoins,
    spendCoins,
    redeemWorkshopTicket
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};