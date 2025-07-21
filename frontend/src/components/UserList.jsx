import React, { useEffect, useState } from 'react';
import { API } from '../utils/api';
import ClaimButton from './ClaimButton';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  
  const getUsers = async () => {
    const res = await API.get('/users');
    if(res.data.length === 0) {
      return alert('No users found, please add a user first');
    }
    setUsers(res.data);
  }
  useEffect(() => {
    getUsers();
    
  }, []);

  const addUser = async () => {
    if (!newUser) return;
    const res = await API.post('/users',
        { name: newUser }
        );
    if (res.status !== 201) {
        return alert('Error adding user');
        }
    alert('User added successfully');
    setUsers(prev => [...prev, res.data]);
    setNewUser('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl mt-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">Users</h2>
      <div className="flex flex-col gap-4">
        {users && users.map(user => (
          <div
            key={user._id}
            className="bg-white/80 hover:bg-blue-100 transition-colors duration-200 shadow-md rounded-2xl border border-blue-100 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-gray-800 text-lg sm:text-xl">{user.name}</span>
            </div>
            <div className="flex-shrink-0">
              <ClaimButton userId={user._id} onClaim={getUsers} />
            </div>
          </div>
        ))}
        {(!users || users.length === 0) && (
          <div className="text-center text-gray-500 py-8 text-lg">
            No users found. Please add a user to get started!
          </div>
        )}
      </div>
    </div>
  );
}
