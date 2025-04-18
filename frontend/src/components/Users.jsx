import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { FiSearch, FiUser, FiSend, FiLogOut } from "react-icons/fi";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchFocus, setSearchFocus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      axios
        .get("https://paytm-nu-pink.vercel.app/api/v1/user/bulk?filter=" + filter)
        .then((response) => {
          setUsers(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500); // Debounce the API call

    return () => clearTimeout(timer);
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            whileHover={{ scale: 1.02 }}
          >
            Users Directory
          </motion.h1>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            label={<div className="flex items-center"><FiLogOut className="mr-2" /> Sign out</div>}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200"
          />
        </div>

        {/* Search Bar */}
        <motion.div 
          className="relative mb-8"
          whileHover={{ scale: 1.01 }}
        >
          <div className={`flex items-center p-3 rounded-xl shadow-sm transition-all duration-200 ${searchFocus ? 'bg-white shadow-md' : 'bg-gray-100'}`}>
            <FiSearch className={`ml-2 text-lg ${searchFocus ? 'text-blue-500' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search users by name..."
              className="w-full bg-transparent border-none outline-none ml-3 text-gray-700 placeholder-gray-400"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
          </div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchFocus ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* User Cards */}
        <div className="grid gap-4">
          {loading ? (
            <AnimatePresence>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm h-20 animate-pulse"
                />
              ))}
            </AnimatePresence>
          ) : users.length === 0 ? (
            <motion.div 
              className="bg-white rounded-xl p-8 text-center shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FiUser className="mx-auto text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No users found</h3>
              <p className="text-gray-500 mt-2">
                {filter ? "Try a different search term" : "There are no users to display"}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {users.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center text-white text-xl font-bold mr-4 shadow-md">
                        {user.firstName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">@{user.username || "user"}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                      label={<div className="flex items-center"><FiSend className="mr-2" /> Send</div>}
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};