import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (

    <div>
      <Navbar/>
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-opacity-90">
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
            onClick={async () => {
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
            }}
            label={"Sign up"}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-lg"
          />
        </div>

        {/* Already have an account */}
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
          className="mt-6 text-center text-gray-600"
        />
      </div>
    </div>
    </div>
  );
};
