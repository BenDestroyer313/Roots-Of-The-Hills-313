import React from 'react';
import { ShoppingBag, Book, User, BarChart2, UserCircle } from 'lucide-react';
import type { Product, Artisan, Story, User as UserType, Review, Order, Course, Workshop, Mission, PahadiMitraInfo } from './types';

export const NAV_ICONS = {
  shop: <ShoppingBag />,
  story: <Book />,
  mitra: <User />,
  impact: <BarChart2 />,
  profile: <UserCircle />,
};

export const MOCK_USER: UserType = {
  id: 'user1',
  name: 'Ben',
  avatar: 'https://i.pravatar.cc/150?u=ben',
  language: 'en',
  role: 'buyer',
  mitraRank: 'Sun',
  mitraLevel: 'Sun',
  coins: 1250,
  badges: ['First Purchase', 'Community Helper'],
  completedMissionIds: ['m1', 'm2'],
  redeemedWorkshopIds: ['w1'],
};

export const MOCK_ARTISANS: Artisan[] = [
    { id: 'artisan1', name: 'Meena Devi', image: 'https://i.pravatar.cc/150?u=meena', village: 'Nainital, Kumaon', story: 'Weaving tales into threads for 20 years.'},
    { id: 'artisan2', name: 'Ramesh Singh', image: 'https://i.pravatar.cc/150?u=ramesh', village: 'Pauri, Garhwal', story: 'Carving the spirit of the mountains into wood.'},
    { id: 'artisan3', name: 'Sunita Bisht', image: 'https://i.pravatar.cc/150?u=sunita', village: 'Almora, Kumaon', story: 'Painting traditions with rice paste and red ochre.' },
    { id: 'artisan4', name: 'Gopal Verma', image: 'https://i.pravatar.cc/150?u=gopal', village: 'Chamoli, Garhwal', story: 'Harvesting the purest honey from Himalayan apiaries.' },
];

export const MOCK_STORIES: Story[] = [
    { id: 'story1', title: 'The Song of the Spindle', content: 'In the heart of Kumaon, every thread spun tells a story of generations. My grandmother taught me how to listen to the wool, to feel its rhythm. This shawl is not just a piece of cloth; it is a song passed down, a warmth that carries our legacy. Each pattern is a verse, each color a memory of the blooming rhododendrons on the hillsides.', artisanId: 'artisan1', image: 'https://picsum.photos/seed/story1/800/600', relatedProducts: ['prod1'], festivalTag: 'Harela Special'},
    { id: 'story2', title: 'Whispers of the Deodar', content: 'The deodar trees have watched over my village for centuries. When I carve, I feel like I am continuing a conversation with them. This wooden box holds their secrets, the scent of the forest, the coolness of the mountain air. It is a piece of our sacred grove, a vessel for your own treasures, blessed by the spirits of the hills.', artisanId: 'artisan2', image: 'https://picsum.photos/seed/story2/800/600', relatedProducts: ['prod2']},
    { id: 'story3', title: 'Aipan: A Prayer on the Floor', content: 'Aipan is more than art; it is a blessing drawn at the doorstep. Using just rice paste and my fingers, I create patterns that invite prosperity and ward off evil. Each dot, each line, is a prayer for my family and for those who will own this piece. This coaster set brings that tradition from our home to yours.', artisanId: 'artisan3', image: 'https://picsum.photos/seed/story3/800/600', relatedProducts: ['prod4'], festivalTag: 'Diwali Special'},
    { id: 'story4', title: 'The Golden Nectar of the Hills', content: 'My bees travel to flowers that only grow high in the Himalayas. This honey is not just sweet; it is medicine. It is the taste of pure mountain air and wild blossoms. We treat our bees like family, and in return, they give us this liquid gold. It is a partnership with nature, a gift we are honored to share.', artisanId: 'artisan4', image: 'https://picsum.photos/seed/story4/800/600', relatedProducts: ['prod5']},
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod1', title: 'Handwoven Kumaoni Shawl', description: 'A soft, warm shawl made from pure Himalayan wool, featuring traditional Kumaoni patterns.', images: ['https://picsum.photos/seed/prod1/800/600', 'https://picsum.photos/seed/prod1-2/800/600'], price: 2500, category: 'Handicrafts', region: 'Kumaon', artisanId: 'artisan1', storyId: 'story1', verified: true, featured: true, season: 'Winter' },
  { id: 'prod2', title: 'Carved Deodar Box', description: 'An intricately carved wooden box made from aromatic deodar wood, perfect for storing jewelry.', images: ['https://picsum.photos/seed/prod2/800/600'], price: 1200, category: 'Handicrafts', region: 'Garhwal', artisanId: 'artisan2', storyId: 'story2', verified: true, featured: true },
  { id: 'prod3', title: 'Organic Rhododendron Juice', description: 'A refreshing and healthy juice made from wild-harvested rhododendron flowers.', images: ['https://picsum.photos/seed/prod3/800/600'], price: 350, category: 'Organic Food', region: 'Garhwal', artisanId: 'artisan2', storyId: 'story2', verified: false, season: 'Summer' },
  { id: 'prod4', title: 'Aipan Art Coasters (Set of 4)', description: 'Set of 4 wooden coasters hand-painted with traditional Aipan folk art.', images: ['https://picsum.photos/seed/prod4/800/600'], price: 700, category: 'Festival', region: 'Kumaon', artisanId: 'artisan3', storyId: 'story3', verified: true, festivalTag: 'Diwali Special' },
  { id: 'prod5', title: 'Himalayan Multiflora Honey', description: 'Raw, unprocessed honey sourced from the nectar of various Himalayan wildflowers.', images: ['https://picsum.photos/seed/prod5/800/600'], price: 550, category: 'Organic Food', region: 'Garhwal', artisanId: 'artisan4', storyId: 'story4', verified: true, featured: true },
  { id: 'prod6', title: 'Woolen Pahadi Topi', description: 'Traditional Garhwali cap made from pure wool, perfect for cold winters.', images: ['https://picsum.photos/seed/prod6/800/600'], price: 900, category: 'Handicrafts', region: 'Garhwal', artisanId: 'artisan2', storyId: 'story2', verified: true, season: 'Winter' },
  { id: 'prod7', title: 'Herbal Immunity Tea', description: 'A blend of rare Himalayan herbs to boost your immunity and wellness.', images: ['https://picsum.photos/seed/prod7/800/600'], price: 400, category: 'Herbal Products', region: 'Kumaon', artisanId: 'artisan1', storyId: 'story1', verified: true },
  { id: 'prod8', title: 'Diwali Aipan Floor Art Stencil', description: 'A reusable stencil to create beautiful Aipan art at your home for Diwali.', images: ['https://picsum.photos/seed/prod8/800/600'], price: 650, category: 'Festival', region: 'Kumaon', artisanId: 'artisan3', storyId: 'story3', verified: true, festivalTag: 'Diwali Special' },
];


export const MOCK_REVIEWS: Review[] = [
    { id: 'r1', productId: 'prod1', userId: 'user2', userName: 'Anjali', userAvatar: 'https://i.pravatar.cc/150?u=anjali', rating: 5, comment: 'Absolutely beautiful shawl! So warm and the craftsmanship is exquisite.', date: '2023-10-25' },
    { id: 'r2', productId: 'prod1', userId: 'user3', userName: 'Vikram', userAvatar: 'https://i.pravatar.cc/150?u=vikram', rating: 4, comment: 'Very high quality, feels authentic. Shipping was a bit slow but worth it.', date: '2023-10-22' },
    { id: 'r3', productId: 'prod2', userId: 'user1', userName: 'Ben', userAvatar: 'https://i.pravatar.cc/150?u=ben', rating: 5, comment: 'The box smells amazing! Perfect gift.', date: '2023-11-01' },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD123',
        date: '2023-10-20',
        status: 'Delivered',
        items: [
            { productId: 'prod1', image: 'https://picsum.photos/seed/prod1/200/200', title: 'Handwoven Kumaoni Shawl', quantity: 1, price: 2500 },
            { productId: 'prod3', image: 'https://picsum.photos/seed/prod3/200/200', title: 'Organic Rhododendron Juice', quantity: 2, price: 350 },
        ],
        total: 3200
    },
     {
        id: 'ORD124',
        date: '2023-11-02',
        status: 'Processing',
        items: [
            { productId: 'prod2', image: 'https://picsum.photos/seed/prod2/200/200', title: 'Carved Deodar Box', quantity: 1, price: 1200 },
        ],
        total: 1200
    }
];

export const MOCK_MISSIONS: Mission[] = [
    { id: 'm1', title: 'Digitize 3 Artisans', description: 'Help three new artisans create their online profile and list their first product.', rewardPoints: 150 },
    { id: 'm2', title: 'Upload 10 High-Quality Photos', description: 'Add 10 new, well-lit photographs for existing product listings.', rewardPoints: 75 },
    { id: 'm3', title: 'Write a Village Story', description: 'Interview a local elder and write a short story about your village for the Story Mode section.', rewardPoints: 100 },
    { id: 'm4', title: 'Mentor a New Artisan', description: 'Guide a newly onboarded artisan through their first five sales.', rewardPoints: 200 },
];

export const MOCK_LEADERBOARD: PahadiMitraInfo[] = [
    { id: 'l1', name: 'Aarav', avatar: 'https://i.pravatar.cc/150?u=aarav', points: 5200, level: 'Mountain' },
    { id: 'l2', name: 'Priya', avatar: 'https://i.pravatar.cc/150?u=priya', points: 4850, level: 'Mountain' },
    { id: 'user1', name: 'Ben (You)', avatar: MOCK_USER.avatar, points: 1250, level: 'Sun' },
    { id: 'l3', name: 'Kiran', avatar: 'https://i.pravatar.cc/150?u=kiran', points: 950, level: 'Sun' },
    { id: 'l4', name: 'Rohan', avatar: 'https://i.pravatar.cc/150?u=rohan', points: 300, level: 'Leaf' },
];

export const MOCK_COURSES: Course[] = [
    { id: 'c1', title: 'Introduction to Aipan Art', description: 'Learn the basics of the traditional Kumaoni art form, Aipan.', difficulty: 'Easy', duration: '2 hours', completed: true },
    { id: 'c2', title: 'Digital Marketing for Artisans', description: 'Understand how to sell your products online and reach a wider audience.', difficulty: 'Intermediate', duration: '5 hours', completed: false },
    { id: 'c3', title: 'Storytelling for Sellers', description: 'Learn how to craft compelling stories for your products to connect with buyers.', difficulty: 'Easy', duration: '1.5 hours', completed: false },
    { id: 'c4', title: 'Packaging & Shipping Basics', description: 'Best practices for safely and beautifully packaging your handcrafted items for shipping.', difficulty: 'Easy', duration: '1 hour', completed: true },
    { id: 'c5', title: 'Sustainable Sourcing', description: 'Explore eco-friendly materials and sustainable practices for your craft.', difficulty: 'Intermediate', duration: '3 hours', completed: false },
];


export const MOCK_WORKSHOPS: Workshop[] = [
    { id: 'w1', title: 'Live Wood Carving Session', description: 'Join Ramesh Singh as he demonstrates his wood carving techniques live from his workshop.', date: 'November 25, 2023', time: '2:00 PM IST', instructor: 'Ramesh Singh', image: 'https://picsum.photos/seed/workshop1/800/600', priceInCoins: 100 },
    { id: 'w2', title: 'Natural Dyeing with Hill Flora', description: 'Discover the art of creating vibrant colors from local plants and flowers with Meena Devi.', date: 'December 2, 2023', time: '11:00 AM IST', instructor: 'Meena Devi', image: 'https://picsum.photos/seed/workshop2/800/600', priceInCoins: 150 },
    { id: 'w3', title: 'Virtual Aipan Art Class', description: 'Learn the basics of Aipan painting in this interactive virtual session. A starter kit can be shipped to you.', date: 'December 9, 2023', time: '3:00 PM IST', instructor: 'Sunita Bisht', image: 'https://picsum.photos/seed/workshop3/800/600', priceInCoins: 200 },
    { id: 'w4', title: 'Pahadi Cuisine Live', description: 'Cook along with a local chef and prepare a delicious traditional Garhwali meal.', date: 'December 16, 2023', time: '6:00 PM IST', instructor: 'Chef Soban', image: 'https://picsum.photos/seed/workshop4/800/600', priceInCoins: 250 },
];