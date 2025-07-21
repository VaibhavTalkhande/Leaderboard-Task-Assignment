import React, { useState } from 'react';
import UserSelector from './components/UsersList';
import Leaderboard from './components/LeaderBoard';
import AddUser from './components/AddUser';

function App() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center px-2 py-4">
      <div className="w-full rounded-xl shadow-lg p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Leaderboard App</h1>
        <AddUser />
        <div className="w-full mt-6">
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 ml-2 ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Leaderboard
            </button>
          </div>
          <div className="w-full">
            {activeTab === 'users' && (
              <div className="animate-fadeIn">
                <UserSelector />
              </div>
            )}
            {activeTab === 'leaderboard' && (
              <div className="animate-fadeIn">
                <Leaderboard />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
