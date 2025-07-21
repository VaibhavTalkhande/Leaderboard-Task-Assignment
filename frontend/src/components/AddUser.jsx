import React from 'react'

const AddUser = ({newUser,addUser}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-4 mt-4">
        <input
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            placeholder="Enter new user name"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
        />
        <button
            onClick={addUser}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition w-full sm:w-auto"
        >
            Add
        </button>
    </div>
  )
}

export default AddUser