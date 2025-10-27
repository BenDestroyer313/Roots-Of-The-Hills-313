import React from 'react';
import Header from '../components/Header';
import { MOCK_WORKSHOPS } from '../constants';
import { Calendar, Clock, User, Gem, Check } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

const Workshops: React.FC = () => {
  const { currentUser, redeemWorkshopTicket } = useAppContext();

  return (
    <div className="bg-rh-off-white/50 min-h-screen">
      <Header title="Workshops & Events" />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-rh-green">Connect with Artisans</h1>
        <p className="text-gray-600 mt-2">Join live virtual workshops and learn from the masters.</p>
      </div>

      <div className="p-4 space-y-6">
        {MOCK_WORKSHOPS.map(workshop => {
          const isRedeemed = currentUser?.redeemedWorkshopIds.includes(workshop.id);
          const canAfford = workshop.priceInCoins && currentUser && currentUser.coins >= workshop.priceInCoins;

          return (
            <div key={workshop.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={workshop.image} alt={workshop.title} className="w-full h-48 object-cover"/>
              <div className="p-6">
                  <h3 className="text-2xl font-bold text-rh-dark">{workshop.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          <span>{workshop.instructor}</span>
                      </div>
                  </div>
                  <p className="text-gray-600 mt-3">{workshop.description}</p>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                               <Calendar className="w-4 h-4 text-rh-terracotta"/>
                               <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                               <Clock className="w-4 h-4 text-rh-terracotta"/>
                               <span>{workshop.time}</span>
                          </div>
                      </div>
                      
                      {isRedeemed ? (
                         <button disabled className="bg-rh-green text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                            <Check /> Attending
                         </button>
                      ) : workshop.priceInCoins ? (
                          <button 
                            onClick={() => redeemWorkshopTicket(workshop)}
                            disabled={!canAfford}
                            className={`font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors ${canAfford ? 'bg-rh-blue text-white hover:bg-rh-blue/90' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                          >
                              <Gem className="w-4 h-4" />
                              Redeem for {workshop.priceInCoins}
                          </button>
                      ) : (
                         <button className="bg-rh-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-rh-blue/90">
                           Register Now
                         </button>
                      )}
                  </div>
                  {!isRedeemed && !canAfford && workshop.priceInCoins && (
                      <p className="text-xs text-red-500 text-right mt-1">Not enough coins</p>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Workshops;
