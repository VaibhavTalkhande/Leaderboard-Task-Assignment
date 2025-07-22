import { FaWandMagicSparkles } from "react-icons/fa6";
import React, { useState } from 'react';
import { API } from '../utils/api';
import { toast } from 'react-hot-toast';

export default function ClaimButton({ userId }) {
  const claimPoints = async () => {
    if (!userId) return alert('Select user first!');
    try {
      const res = await API.post(`/claim/${userId}`);
      if (res.status !== 200) {
        return toast.error('Failed to claim points. Please try again.');
      }else{
        const { user, randomPoints } = res.data;
        toast.success(`${user.name} claimed ${randomPoints} points!`);
      }
    } catch (error) {
      return toast.error('Failed to claim points. Please try again.');
    }
  
  };

  return (
    <div>
      <button
        onClick={claimPoints}
        className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-yellow-900 font-semibold rounded-2xl px-6 py-3 shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        <FaWandMagicSparkles className="text-xl" />
        Claim Points
      </button>
    </div>
  );
}
