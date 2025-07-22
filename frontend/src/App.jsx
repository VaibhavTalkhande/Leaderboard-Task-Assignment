import React, { useState, useEffect } from 'react';
import UserSelector from './components/UserSelector';
import AddUser from './components/AddUser';
import Leaderboard from './components/LeaderBoard';
import { Toaster } from 'react-hot-toast';
import { API } from './utils/api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState('');

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(Array.isArray(res.data) ? res.data : res.data.users || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!newUser) return;
    const res = await API.post('/users', { name: newUser });
    setNewUser('');
    fetchUsers();
  };

  return (
    
    <div className="min-h-screen  bg-gradient-to-br from-white to-blue-400 flex flex-col items-center px-2 py-4">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-3xl font-bold text-slate-700 mb-4 text-center">Leaderboard Task </h1>
        <AddUser newUser={newUser} setNewUser={setNewUser} addUser={addUser} />
        <div className="w-full flex flex-col mt-6 justify-center items-center">
            <div className="flex flex-col w-full justify-center items-center">
              <UserSelector users={users} selected={selectedUser} setSelected={setSelectedUser} />
              <Leaderboard/>
            </div>
        </div>
    </div>
  );
}

export default App;
