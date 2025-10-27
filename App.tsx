import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { useAppContext } from './hooks/useAppContext';
import BottomNav from './components/BottomNav';
import SplashScreen from './components/SplashScreen';
import Shop from './pages/Shop';
import StoryMode from './pages/StoryMode';
import PahadiMitra from './pages/PahadiMitra';
import Impact from './pages/Impact';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import StoryDetail from './pages/StoryDetail';
import RootsAcademy from './pages/RootsAcademy';
import Workshops from './pages/Workshops';
import Chatbot from './components/Chatbot';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import ArtisanProfile from './pages/ArtisanProfile';
import Wishlist from './pages/Wishlist';
import ProfileSettings from './pages/ProfileSettings';
import OrderHistory from './pages/OrderHistory';
import Signup from './pages/Signup';

const MainAppLayout: React.FC = () => {
    const location = useLocation();
    const noNavRoutes = ['/cart', '/product', '/artisan', '/wishlist', '/profile/settings', '/orders'];
    const showNav = !noNavRoutes.some(path => location.pathname.startsWith(path));

    return (
        <div className="font-sans text-rh-dark min-h-screen bg-rh-off-white">
            <main className={`pb-20 transition-all duration-300 ${!showNav ? 'pb-0' : ''}`}>
                <Routes>
                    <Route path="/" element={<Shop />} />
                    <Route path="/story" element={<StoryMode />} />
                    <Route path="/story/:id" element={<StoryDetail />} />
                    <Route path="/mitra" element={<PahadiMitra />} />
                    <Route path="/impact" element={<Impact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/settings" element={<ProfileSettings />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/academy" element={<RootsAcademy />} />
                    <Route path="/workshops" element={<Workshops />} />
                    <Route path="/artisan/:id" element={<ArtisanProfile />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            {showNav && <BottomNav />}
            <Chatbot />
        </div>
    );
};

const AppRouter: React.FC = () => {
    const { currentUser } = useAppContext();

    return (
        <Routes>
            {currentUser ? (
                <Route path="/*" element={<MainAppLayout />} />
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/*" element={<Onboarding />} />
                </>
            )}
        </Routes>
    );
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <AppProvider>
        <Router>
            <AppRouter />
        </Router>
    </AppProvider>
  );
};

export default App;