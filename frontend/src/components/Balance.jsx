import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";

export const Balance = () => {
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://paytm-nu-pink.vercel.app/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(Math.floor(response.data.balance));
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setError(err.response?.data?.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [token]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchBalance();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl sm:text-2xl">Your Balance:</div>
        
        <motion.button
          onClick={handleRefresh}
          whileHover={{ rotate: 30 }}
          whileTap={{ scale: 0.9 }}
          disabled={isRefreshing}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Refresh balance"
        >
          <FiRefreshCw className={`text-xl ${isRefreshing ? "animate-spin" : ""}`} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-8 mt-2 bg-white/10 rounded animate-pulse"
          />
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center mt-2 text-red-200"
          >
            <FiAlertCircle className="mr-2" />
            <span>{error}</span>
          </motion.div>
        ) : (
          <motion.div
            key="balance"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-semibold text-2xl sm:text-3xl mt-2"
          >
            ₹ {balance?.toLocaleString("en-IN")}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="h-1 bg-white/20 mt-3 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-white/50"
          animate={{ 
            x: ["-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
};