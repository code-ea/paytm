import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import { FiSend, FiUser, FiArrowRight, FiCheckCircle } from "react-icons/fi";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recipientInitial, setRecipientInitial] = useState("");

  useEffect(() => {
    if (name) {
      setRecipientInitial(name[0].toUpperCase());
    }
  }, [name]);

  const handleTransfer = async () => {
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSending(true);
    try {
      await axios.post(
        "https://paytm-nu-pink.vercel.app/api/v1/account/transfer",
        { to: id, amount: parseFloat(amount) },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      toast.success(`₹${amount} sent successfully to ${name}!`);
      setIsSuccess(true);
      setAmount("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Transfer failed");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-2xl shadow-xl text-center"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <FiCheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Transfer Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  ₹{amount} was sent to {name}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Send Another Transfer
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Send Money
                  </h2>
                </div>

                {/* Recipient Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex items-center p-4 bg-gray-50 rounded-lg mb-6"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center shadow-md">
                      <span className="text-2xl text-white font-bold">
                        {recipientInitial}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <FiUser className="text-white text-xs" />
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">Recipient</p>
                  </div>
                  <FiArrowRight className="ml-auto text-gray-400" />
                </motion.div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleTransfer();
                      }}
                      type="number"
                      min="1"
                      step="0.01"
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
                      placeholder="0.00"
                    />
                  </motion.div>
                </div>

                {/* Transfer Button */}
                <motion.button
                  onClick={handleTransfer}
                  disabled={isSending || !amount}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 text-lg font-medium text-white rounded-lg shadow-md transition-all duration-200 flex items-center justify-center ${
                    isSending || !amount
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  }`}
                >
                  {isSending ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FiSend className="mr-2" />
                      Send ₹{amount || "0"}
                    </span>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};