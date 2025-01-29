import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {Navbar} from "../components/Navbar";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-xl shadow-2xl rounded-3xl">
        <Heading label={"Sign in"} className="text-pink-600 text-4xl font-bold text-center shadow-md mb-4" />
        <SubHeading
          label={"Enter your credentials to access your account"}
          className="text-yellow-600 text-lg text-center mt-2 mb-4"
        />

        {/* Email Input */}
        <InputBox
          placeholder="harkirat@gmail.com"
          label={"Email"}
          onchange={(e) => setUsername(e.target.value)}
          className="mt-6"
        />

        {/* Password Input */}
        <InputBox
          type="password"
          placeholder="••••••"
          label={"Password"}
          onchange={(e) => setPassword(e.target.value)}
          className="mt-4"
        />

        {/* Sign-in Button */}
        <div className="pt-6">
          <Button
            label={"Sign in"}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={async () => {
              axios
                .post("https://paytm-nu-pink.vercel.app/api/v1/user/signin", {
                  username,
                  password,
                })
                .then((response) => {
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                })
                .catch((error) => {
                  toast.error(error.response.data.message);
                });
            }}
          />
        </div>

        {/* Sign-up Prompt */}
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
          className="mt-4 text-center text-white"
        />
      </div>
    </div>
    </div>

    
  );
};
