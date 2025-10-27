
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import { Plus, Minus, Trash2, ShoppingCart, X, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { currentUser, cart, updateCartQuantity, removeFromCart, spendCoins, addCoins, clearCart } = useAppContext();
  
  const [coinsToApply, setCoinsToApply] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [orderSummary, setOrderSummary] = useState({ spent: 0, earned: 0 });

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  
  const discount = useMemo(() => Math.min(coinsToApply, subtotal, currentUser?.coins || 0), [coinsToApply, subtotal, currentUser]);
  
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax;

  const handleApplyCoins = () => {
      setCoinsToApply(currentUser?.coins || 0);
  };
  
  const handleCheckout = () => {
      // 1. Spend coins for discount
      spendCoins(discount);

      // 2. Earn 5% of subtotal as new coins
      const coinsEarned = Math.floor(subtotal * 0.05);
      addCoins(coinsEarned);
      
      // 3. Show thank you modal
      setOrderSummary({ spent: discount, earned: coinsEarned });
      setShowThankYou(true);
      
      // 4. Clear cart
      clearCart();
      setCoinsToApply(0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="My Cart" />
      {cart.length === 0 && !showThankYou ? (
        <div className="text-center py-20 px-4">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
            <h2 className="text-2xl font-semibold text-gray-700 mt-4">Your cart is empty</h2>
            <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="mt-8 inline-block bg-rh-terracotta text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-rh-terracotta/90 transition-colors">
                Continue Shopping
            </Link>
        </div>
      ) : (
        <div className="p-4 pb-40">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-cover rounded-md"/>
                <div className="flex-1">
                  <p className="font-semibold text-rh-dark">{item.title}</p>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-full"><Minus className="w-4 h-4" /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-full"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg text-rh-dark">₹{item.price * item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 mt-2"><Trash2 className="w-5 h-5"/></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Redeem Roots Coins</h3>
            <div className="flex items-center gap-2">
                 <input
                    type="number"
                    placeholder="0"
                    value={coinsToApply}
                    onChange={(e) => setCoinsToApply(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-rh-terracotta"
                    max={currentUser?.coins || 0}
                />
                <button onClick={handleApplyCoins} className="bg-rh-terracotta/20 text-rh-terracotta font-bold py-2 px-4 rounded-lg hover:bg-rh-terracotta/30 whitespace-nowrap">
                    Apply Max
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">You have {currentUser?.coins || 0} coins available.</p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Roots Coin Discount</span>
                        <span>- ₹{discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </div>
            <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full mt-6 bg-rh-green text-white py-3 rounded-lg text-lg font-bold hover:bg-rh-green/90 disabled:bg-gray-400">
                Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {showThankYou && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full relative">
                <button onClick={() => setShowThankYou(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
                <PartyPopper className="w-20 h-20 mx-auto text-rh-terracotta"/>
                <h2 className="text-2xl font-bold text-rh-dark mt-4">Thank You!</h2>
                <p className="text-gray-600 mt-2">Your order has been placed. You're supporting the heart of the Hills.</p>
                <div className="mt-6 text-left space-y-2">
                    <div className="flex justify-between p-3 bg-red-50 rounded-lg">
                        <span className="font-semibold text-red-700">Coins Spent:</span>
                        <span className="font-bold text-red-700">{orderSummary.spent}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-semibold text-green-700">Coins Earned:</span>
                        <span className="font-bold text-green-700">+{orderSummary.earned}</span>
                    </div>
                </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Cart;
