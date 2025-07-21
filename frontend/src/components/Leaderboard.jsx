import React, { useEffect, useState } from 'react';
import { API } from '../utils/api';
import TopRankerCard from './TopRankerCard';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await API.get('/claim/leaderboard');
    setLeaderboard(res.data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-700">Leaderboard</h3>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        {leaderboard.slice(0, 3).map((user, i) => (
          <TopRankerCard user={user} rank={i + 1} key={user._id} />
        ))}
      </div>
      <ul className="divide-y divide-gray-200">
        {leaderboard.map((user, i) => (
          <li
            key={user._id}
            className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition"
          >
            <span className="font-semibold text-gray-700">{user.rank}. {user.name}</span>
            <span className="text-blue-600 font-bold">{user.totalPoints} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}