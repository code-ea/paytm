import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { toast } from "sonner";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isValidName = (name) => /^[A-Za-z]+$/.test(name);

  const handleSignup = async () => {
    if (firstName == "" || lastName == "" || username == "" || password == "") {
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
    if (!username) {
      toast.error("Email cannot be empty");
      return;
    }
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://paytm-nu-pink.vercel.app/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-opacity-90 relative">
          <Heading label={"Sign up"} className="text-4xl font-bold text-center text-indigo-600 mb-6" />
          <SubHeading label={"Enter your information to create an account"} className="text-lg text-gray-600 text-center mb-6" />

          {/* First Name */}
          <InputBox
            placeholder="John"
            label={"First Name"}
            onchange={(e) => setFirstName(e.target.value)}
            className="mb-4"
          />

          {/* Last Name */}
          <InputBox
            placeholder="Doe"
            label={"Last Name"}
            onchange={(e) => setLastName(e.target.value)}
            className="mb-4"
          />

          {/* Email */}
          <InputBox
            placeholder="harkirat@gmail.com"
            label={"Email"}
            onchange={(e) => setUsername(e.target.value)}
            className="mb-4"
          />

          {/* Password */}
          <InputBox
            placeholder="********"
            type="password"
            label={"Password"}
            onchange={(e) => setPassword(e.target.value)}
            className="mb-6"
          />

          {/* Sign Up Button */}
          <div className="pt-6">
            <Button
              onClick={handleSignup}
              label={"Sign up"}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg"
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

          {/* Already have an account */}
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
            className="mt-6 text-center text-gray-600"
          />
        </div>
      </div>

      {/* Loader Styles */}
      <style>
        {`
          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 64px;
            height: 64px;
            border-radius: 50%;
            perspective: 800px;
          }

          .inner {
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border-radius: 50%;  
          }

          .inner.one {
            left: 0%;
            top: 0%;
            animation: rotate-one 1s linear infinite;
            border-bottom: 3px solid #EFEFFA;
          }

          .inner.two {
            right: 0%;
            top: 0%;
            animation: rotate-two 1s linear infinite;
            border-right: 3px solid #EFEFFA;
          }

          .inner.three {
            right: 0%;
            bottom: 0%;
            animation: rotate-three 1s linear infinite;
            border-top: 3px solid #EFEFFA;
          }

          @keyframes rotate-one {
            0% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg); }
            100% { transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg); }
          }

          @keyframes rotate-two {
            0% { transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg); }
            100% { transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg); }
          }

          @keyframes rotate-three {
            0% { transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg); }
            100% { transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg); }
          }
        `}
      </style>
    </div>
  );
};
