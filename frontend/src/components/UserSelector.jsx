import React from 'react';
import ClaimButton from './ClaimButton';

export default function UserSelector({ users, selected, setSelected }) {
  return (
    <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-4 w-full">
      <div className="relative w-full max-w-xs items-center">
        <select
          className="w-full bg-white border border-blue-300 rounded-xl px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 shadow transition"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map(user => (
            <option
              key={user._id}
              value={user._id}
              className="py-2"
            >
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <ClaimButton userId={selected} />
      </div>
    </div>
  );
} 