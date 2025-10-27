
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { MOCK_MISSIONS, MOCK_LEADERBOARD } from '../constants';
import { Gem, CheckCircle, Gift, Award, Leaf, Sun, Zap } from 'lucide-react';
import Header from '../components/Header';

const MitraLevelIcon: React.FC<{ level: 'Leaf' | 'Sun' | 'Mountain' | 'New' }> = ({ level }) => {
    switch (level) {
        case 'Leaf': return <Leaf className="w-6 h-6 text-green-500" />;
        case 'Sun': return <Sun className="w-6 h-6 text-yellow-500" />;
        case 'Mountain': return <Award className="w-6 h-6 text-blue-500" />;
        default: return <Zap className="w-6 h-6 text-gray-400" />;
    }
};

const PahadiMitra: React.FC = () => {
    const { currentUser, claimMissionReward, claimedMissionIds } = useAppContext();

    if (!currentUser) {
        return (
            <div className="p-4 text-center">
                <p>Please log in to view the PahadiMitra Dashboard.</p>
            </div>
        );
    }
    
    const activeMissions = MOCK_MISSIONS.filter(m => !currentUser.completedMissionIds.includes(m.id));
    const completedMissions = MOCK_MISSIONS.filter(m => currentUser.completedMissionIds.includes(m.id));

    return (
        <div className="bg-rh-off-white/50 min-h-screen">
            <Header title="Mitra Dashboard" />

            {/* User Stats Header */}
            <div className="p-6 bg-white shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full border-4 border-rh-blue/50" />
                    <div>
                        <h1 className="text-2xl font-bold text-rh-dark">{currentUser.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                           <MitraLevelIcon level={currentUser.mitraLevel} />
                           <span className="font-semibold text-lg">{currentUser.mitraLevel} Mitra</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                    <div className="bg-rh-terracotta/10 p-4 rounded-xl">
                        <Gem className="w-8 h-8 text-rh-terracotta mx-auto" />
                        <p className="text-2xl font-bold mt-1">{currentUser.coins}</p>
                        <p className="text-sm text-gray-600">Total Coins</p>
                    </div>
                    <div className="bg-rh-green/10 p-4 rounded-xl">
                        <CheckCircle className="w-8 h-8 text-rh-green mx-auto" />
                        <p className="text-2xl font-bold mt-1">{currentUser.completedMissionIds.length}</p>
                        <p className="text-sm text-gray-600">Missions Done</p>
                    </div>
                </div>
            </div>

            {/* Active Missions */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-rh-dark mb-4">Your Active Missions</h2>
                <div className="space-y-4">
                    {activeMissions.length > 0 ? activeMissions.map(mission => (
                        <div key={mission.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-rh-terracotta">
                            <h3 className="font-bold text-lg text-rh-dark">{mission.title}</h3>
                            <p className="text-gray-600 mt-1">{mission.description}</p>
                            <div className="mt-3 flex items-center justify-end gap-2 text-rh-terracotta font-semibold">
                                <Gift className="w-5 h-5" />
                                <span>{mission.rewardPoints} Coins</span>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                            <p>No new missions available. Great work clearing the board!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Completed Missions */}
            <div className="p-4">
                <h2 className="text-xl font-bold text-rh-dark mb-4">Completed & Rewards</h2>
                 <div className="space-y-4">
                    {completedMissions.map(mission => {
                        const isClaimed = claimedMissionIds.includes(mission.id);
                        return (
                            <div key={mission.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center opacity-90">
                                <div>
                                    <h3 className="font-semibold text-gray-700 line-through">{mission.title}</h3>
                                    <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-1"><CheckCircle className="w-4 h-4" /> Completed</p>
                                </div>
                                <button
                                    onClick={() => claimMissionReward(mission.id)}
                                    disabled={isClaimed}
                                    className={`px-4 py-2 rounded-lg font-bold text-sm text-white transition-colors ${isClaimed ? 'bg-gray-400 cursor-not-allowed' : 'bg-rh-green hover:bg-rh-green/90'}`}
                                >
                                    {isClaimed ? `+${mission.rewardPoints} Claimed` : `Claim ${mission.rewardPoints} Coins`}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Leaderboard */}
            <div className="p-4">
                 <h2 className="text-xl font-bold text-rh-dark mb-4">Top Mitras of the Month</h2>
                 <div className="bg-white rounded-xl shadow-md divide-y">
                    {MOCK_LEADERBOARD.sort((a, b) => b.points - a.points).map((mitra, index) => (
                        <div key={mitra.id} className={`p-4 flex items-center gap-4 ${mitra.id === currentUser.id ? 'bg-rh-blue/10' : ''}`}>
                            <span className="font-bold text-lg text-gray-400 w-6 text-center">{index + 1}</span>
                            <img src={mitra.avatar} alt={mitra.name} className="w-12 h-12 rounded-full"/>
                            <div className="flex-1">
                                <p className="font-semibold text-rh-dark">{mitra.name}</p>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <MitraLevelIcon level={mitra.level} />
                                    <span>{mitra.level} Mitra</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-rh-terracotta text-lg">{mitra.points}</p>
                                <p className="text-xs text-gray-500">Points</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
};

export default PahadiMitra;
