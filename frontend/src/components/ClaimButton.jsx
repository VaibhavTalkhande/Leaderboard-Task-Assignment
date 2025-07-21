import { FaHandSparkles, FaTrophy } from 'react-icons/fa';
import React, { useState } from 'react';
import { API } from '../utils/api';

export default function ClaimButton({ userId, onClaim }) {
  const [points, setPoints] = useState(null);

  const claimPoints = async () => {
    if (!userId) return alert('Select user first!');
    const res = await API.post(`/claim/${userId}`);
    setPoints(res.data.randomPoints);
    onClaim(); // refresh leaderboard
  };

  return (
    <div>

      <button
        onClick={claimPoints}
        className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-yellow-900 font-semibold rounded-2xl px-6 py-3 shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <FaHandSparkles className="text-xl" />
        Claim Points
      </button>
      {points !== null && (
        <div className="mt-3 flex items-center gap-2 text-green-600 font-bold text-lg animate-bounce">
          <FaTrophy className="text-xl" />
          Claimed {points} points!
        </div>
      )}
    </div>
  );
}
