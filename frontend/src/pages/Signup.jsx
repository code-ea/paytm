import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../components/Loader.css";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const isValidName = (name) => /^[A-Za-z]+$/.test(name);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !username || !password) {
      toast.error("All fields are required");
      return;
    }
    if (!isValidName(firstName)) {
      toast.error("First name must contain only letters");
      return;
    }
    if (!isValidName(lastName)) {
      toast.error("Last name must contain only letters");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://paytm-nu-pink.vercel.app/api/v1/user/signup",
        { username, firstName, lastName, password }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSignup}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="p-8 text-center bg-gray-50 border-b border-gray-200">
              <Heading 
                label="Create Account"
                className="text-gray-900"
              />
              <SubHeading
                label="Get started with your Paytm Clone account"
                className="text-gray-600 mt-2"
              />
            </div>

            {/* Form Content */}
            <div className="px-8 pb-8">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <InputBox
                  placeholder="John"
                  label="First Name"
                  icon={<FiUser className="text-gray-500" />}
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <InputBox
                  placeholder="Doe"
                  label="Last Name"
                  icon={<FiUser className="text-gray-500" />}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>

              <InputBox
                type="email"
                placeholder="john@example.com"
                label="Email"
                icon={<FiMail className="text-gray-500" />}
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="mb-4"
              />

              <InputBox
                type="password"
                placeholder="••••••••"
                label="Password"
                icon={<FiLock className="text-gray-500" />}
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
                        <span className="inline-block animate-spin mr-2">
                          <FiArrowRight />
                        </span>
                      ) : (
                        <>
                          Create Account
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
                label="Already have an account?"
                buttonText="Sign in"
                to="/signin"
                className="mt-6 text-center text-gray-600"
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};