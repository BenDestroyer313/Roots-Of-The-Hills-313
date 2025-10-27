export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: 'Handicrafts' | 'Organic Food' | 'Herbal Products' | 'Festival';
  region: 'Kumaon' | 'Garhwal';
  artisanId: string;
  storyId: string;
  verified: boolean;
  featured?: boolean;
  season?: 'Winter' | 'Summer';
  // FIX: Added optional festivalTag to support festival-specific products.
  festivalTag?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Artisan {
  id:string;
  name: string;
  image: string;
  village: string;
  story: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  image: string;
  artisanId: string;
  relatedProducts: string[];
  festivalTag?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  language: 'en' | 'hi';
  role: 'buyer' | 'artisan';
  mitraRank: string;
  mitraLevel: 'Leaf' | 'Sun' | 'Mountain' | 'New';
  coins: number;
  badges: string[];
  completedMissionIds: string[];
  redeemedWorkshopIds: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
}

export interface PahadiMitraInfo {
    id: string;
    name: string;
    avatar: string;
    points: number;
    level: 'Leaf' | 'Sun' | 'Mountain';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface OrderItem {
    productId: string;
    image: string;
    title: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    date: string;
    status: 'Delivered' | 'Processing' | 'Cancelled';
    items: OrderItem[];
    total: number;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Intermediate';
    duration: string;
    completed: boolean;
}

export interface Workshop {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    instructor: string;
    image: string;
    priceInCoins?: number;
}