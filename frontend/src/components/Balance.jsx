import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = ({ value }) => {
  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      const response = await axios.get("https://paytm-nu-pink.vercel.app/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        }
      });
      setAmount(Math.floor(response.data.balance));
    };
    getBalance();
  }, [token]);

  return (
    <div className="flex justify-between items-center bg-neutral-700 text-white p-3 rounded-xl shadow-lg">
      <div className="font-bold text-xl sm:text-2xl">
        Your Balance:
      </div>
      <div className="font-semibold text-2xl sm:text-3xl ml-4 text-shadow-md">
        Rs. {amount}
      </div>
    </div>
  );
};
