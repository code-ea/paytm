import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import {Navbar} from "../components/Navbar";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  const handleTransfer = () => {
    axios
      .post(
        "https://paytm-nu-pink.vercel.app/api/v1/account/transfer",
        { to: id, amount },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      )
      .then(() => {
        toast.success(`Rs. ${amount} sent successfully!`);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div>
        <Navbar/>
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700">Send Money</h2>

        {/* User Info */}
        <div className="flex items-center space-x-4 mt-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center shadow-md">
            <span className="text-3xl text-white font-bold">
              {name?.[0].toUpperCase()}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
        </div>

        {/* Amount Input */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium text-sm mb-1">Amount (in Rs)</label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTransfer(); // Trigger on Enter key press
            }}
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Enter amount"
          />
        </div>

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          className="mt-6 w-full py-3 text-lg font-medium bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg hover:opacity-90 transition-all duration-200"
        >
          Initiate Transfer
        </button>
      </div>
    </div>
    </div>
  );
};
