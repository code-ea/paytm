import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://paytm-nu-pink.vercel.app/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Users
      </h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-200"
        />
      </div>

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>

      {/* Sign Out Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          label="Sign out"
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
        />
      </div>
    </div>
  );
};

// User Component
function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white bg-opacity-90 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
      {/* User Avatar */}
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center text-white text-xl font-bold mr-4 shadow-md">
          {user.firstName[0]}
        </div>
        <div className="text-gray-800 text-lg font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>

      {/* Send Money Button */}
      <Button
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
        label="Send Money"
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md"
      />
    </div>
  );
}
