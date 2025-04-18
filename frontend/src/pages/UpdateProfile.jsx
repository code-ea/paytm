import { useState, useEffect } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Navbar } from "../components/Navbar";
import "../components/Loader.css";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheckCircle } from "react-icons/fi";

export const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  const isValidName = (name) => /^[A-Za-z]+$/.test(name);

  const handleUpdate = async (e) => {
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
      await axios.put(
        "https://paytm-nu-pink.vercel.app/api/v1/user/edit",
        { username, firstName, lastName, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setIsSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <FiCheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Profile Updated!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your changes have been saved successfully.
                </p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  label="Back to Dashboard"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="text-center mb-8">
                  <Heading 
                    label="Update Profile"
                    className="text-gray-900"
                  />
                  <SubHeading
                    label="Update your account information"
                    className="text-gray-600 mt-2"
                  />
                </div>

                <form onSubmit={handleUpdate}>
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
                              Update Profile
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
                </form>

                <BottomWarning
                  label="Want to test your new credentials?"
                  buttonText="Sign in"
                  to="/signin"
                  className="mt-6 text-center text-gray-600"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
