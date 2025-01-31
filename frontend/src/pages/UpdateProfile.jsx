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

export const UpdateProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token == null) {
      navigate("/signin");
    }
  }, [token, navigate]);

  const isValidName = (name) => /^[A-Za-z]+$/.test(name);

  const handleUpdate = async () => {
    if (firstName === "" || lastName === "" || username === "" || password === "") {
      toast.error("Fields cannot be empty");
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
      const response = await axios.put(
        "https://paytm-nu-pink.vercel.app/api/v1/user/edit",
        {
          username,
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      toast.success("Updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-600 to-red-600">
        <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-xl shadow-2xl rounded-3xl relative">
          <Heading label={"Update Details"} className="text-pink-600 text-4xl font-bold text-center shadow-md mb-4" />
          <SubHeading label={"Enter your new details to update your account"} className="text-yellow-600 text-lg text-center mt-2 mb-4" />

          {/* First Name Input */}
          <InputBox
            placeholder="Nitin"
            label={"First Name"}
            onchange={(e) => setFirstName(e.target.value)}
            className="mt-6"
          />

          {/* Last Name Input */}
          <InputBox
            placeholder="Singh"
            label={"Last Name"}
            onchange={(e) => setLastName(e.target.value)}
            className="mt-4"
          />

          {/* Email Input */}
          <InputBox
            placeholder="nitin@gmail.com"
            label={"Email"}
            onchange={(e) => setUsername(e.target.value)}
            className="mt-4"
          />

          {/* Password Input */}
          <InputBox
            type="password"
            placeholder="••••••"
            label={"Password"}
            onchange={(e) => setPassword(e.target.value)}
            className="mt-4"
          />

          {/* Update Button */}
          <div className="pt-6">
            <Button
              label={"Update"}
              className="w-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white py-3 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={handleUpdate}
              disabled={loading}
            />
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 rounded-lg">
              <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
              </div>
            </div>
          )}

          {/* Sign in Prompt */}
          <BottomWarning
            label={"Try signing in with new credentials"}
            buttonText={"Sign in"}
            to={"/signin"}
            className="mt-4 text-center text-white"
          />
        </div>
      </div>
    </div>
  );
};
