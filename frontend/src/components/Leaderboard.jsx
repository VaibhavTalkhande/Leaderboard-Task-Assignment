import React, { useEffect, useState } from 'react';
import { API } from '../utils/api';
import TopRankerCard from './TopRankerCard';
import { io } from 'socket.io-client';
import { FaRankingStar } from "react-icons/fa6";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [topRankers, setTopRankers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  const fetchLeaderboard = async (pageNum = 1) => {
    const res = await API.get(`/leaderboard?page=${pageNum}&limit=${limit}`);
    setLeaderboard(res.data.leaderboard || []);
    setPage(res.data.page || 1);
    setTotalPages(res.data.totalPages || 1);
    setTotalUsers(res.data.totalUsers || 0);
  };

  const fetchTopRankers = async () => {
    const res = await API.get('/leaderboard/top-rankers');
    setTopRankers(res.data.topRankers || []);
  };

  useEffect(() => {
    fetchLeaderboard(page);
    fetchTopRankers();
    // socket event listeners for real-time updates in leaderboard and top ranks
    const handleLeaderboardUpdate = () => fetchLeaderboard(page);
    socket.on('leaderboardUpdate', handleLeaderboardUpdate);
    const handleTopRankersUpdate = (data) => setTopRankers(data.topRankers || []);
    socket.on('topRankersUpdate', handleTopRankersUpdate);
    return () => {
      socket.off('leaderboardUpdate', handleLeaderboardUpdate);
      socket.off('topRankersUpdate', handleTopRankersUpdate);
    };
  }, [page]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <div className="flex flex-col items-center mb-4">
          <span className="flex items-center gap-2">
            <FaRankingStar className="text-3xl text-amber-400 drop-shadow" />
            <span className="text-2xl font-bold text-slate-700">Leaderboard</span>
          </span>
        </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        {/* Top Rankers Section */}
        {topRankers.map((user, i) => (
          <TopRankerCard user={user} rank={user.rank} key={user._id} />
        ))}
      </div>
      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider w-20">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-blue-700 uppercase tracking-wider w-32">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {leaderboard.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-bold text-blue-600">{user.rank}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{user.name}</td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">{user.totalPoints} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
          <button
            key={p}
            className={`px-3 py-1 rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => goToPage(p)}
            disabled={p === page}
          >
            {p}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div className="text-center text-gray-500 mt-2 text-sm">
        Showing page {page} of {totalPages} ({totalUsers} users)
      </div>
    </div>
  );
}