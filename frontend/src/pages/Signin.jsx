import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../components/Loader.css";
import { FiLogIn, FiLoader, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://paytm-nu-pink.vercel.app/api/v1/user/signin",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSignIn}>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="p-8 text-center bg-gray-50 border-b border-gray-200">
              <Heading 
                label="Welcome Back"
                className="text-gray-900"
              />
              <SubHeading
                label="Sign in to access your account"
                className="text-gray-600 mt-2"
              />
            </div>

            {/* Form Content */}
            <div className="px-8 pb-8 bg-white">
              <InputBox
                type="email"
                placeholder="your@email.com"
                label="Email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="mb-4"
              />

              <InputBox
                type="password"
                placeholder="••••••••"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mb-6"
              />

              <motion.div
                whileHover={{ scale: 1.01 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <Button
                  type="submit"
                  label={
                    <div className="flex items-center justify-center">
                      {loading ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <FiLogIn className="mr-2" />
                          Sign In
                          <AnimatePresence>
                            {isHovered && !loading && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="ml-2"
                              >
                                <FiArrowRight />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  }
                  className={`w-full py-3 text-lg font-medium rounded-lg ${
                    loading
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  disabled={loading}
                />
              </motion.div>

              <BottomWarning
                label="Don't have an account?"
                buttonText="Sign up"
                to="/signup"
                className="mt-6 text-center text-gray-600"
              />
            </div>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};