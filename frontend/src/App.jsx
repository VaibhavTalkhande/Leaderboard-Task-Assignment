import React, { useState } from 'react';
import UserList from './components/UserList';
import Leaderboard from './components/LeaderBoard';
import AddUser from './components/AddUser';

function App() {

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center px-2 py-4">
      <div className="w-full rounded-xl shadow-lg p-4 md:p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Leaderboard App</h1>
        <AddUser />
        <div className="w-full max-w-3xl mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <UserList />
              <Leaderboard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
