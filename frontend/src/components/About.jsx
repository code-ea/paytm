import React from "react";
import {Navbar} from "./Navbar";
export const About = () => {
  return (
    <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto py-10 px-6">
    
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        About Paytm Clone
      </h1>

      <p className="text-gray-700 text-lg mb-4">
        Welcome to the <strong>Paytm Clone</strong>, a web-based digital wallet
        and payment system inspired by the popular fintech platform{" "}
        <strong>Paytm</strong>. This project aims to replicate key
        functionalities such as <strong>user authentication, wallet
        transactions, and seamless payments</strong> in a modern web
        application.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Features</h2>
      <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
        <li>🔐 Secure <strong>Signup & Login</strong> with JWT authentication.</li>
        <li>💰 <strong>Wallet Management</strong> - Add, Send, & Receive Payments.</li>
        <li>📊 <strong>Transaction History</strong> to track payments.</li>
        <li>🛠️ <strong>Admin Dashboard</strong> for managing users & transactions.</li>
        <li>📱 <strong>Responsive UI</strong> built with React & Tailwind CSS.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Tech Stack</h2>
      <p className="text-gray-700 text-lg">
        🚀 <strong>Frontend:</strong> React.js, Tailwind CSS <br />
        🔧 <strong>Backend:</strong> Node.js, Express.js <br />
        📦 <strong>Database:</strong> MongoDB with Mongoose <br />
        🔐 <strong>Authentication:</strong> JWT & bcrypt <br />
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">How It Works</h2>
      <ul className="list-decimal list-inside text-gray-700 text-lg space-y-2">
        <li>Sign up for an account.</li>
        <li>Login to access your wallet.</li>
        <li>Add money to your account.</li>
        <li>Send or receive payments instantly.</li>
        <li>Check your transaction history.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
        Installation & Setup
      </h2>
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
        {`# Clone the repository
git clone https://github.com/code-ea/paytm.git
cd paytm

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Configure environment variables (backend/.env)
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# Start backend server
cd backend
npm start

# Start frontend
cd ../frontend
npm start`}
      </pre>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
        Future Enhancements
      </h2>
      <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
        <li>🔹 Payment Gateway Integration (Razorpay, Stripe)</li>
        <li>🔹 QR Code-based Transactions</li>
        <li>🔹 Recharge & Bill Payments</li>
        <li>🔹 AI-powered Expense Tracker</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
        Conclusion
      </h2>
      <p className="text-gray-700 text-lg">
        The <strong>Paytm Clone</strong> project is a step towards building a{" "}
        <strong>secure and user-friendly digital wallet</strong>. It’s ideal for
        developers looking to learn <strong>full-stack development</strong> while
        implementing real-world fintech solutions.
      </p>

      <p className="text-xl font-bold text-blue-500 mt-6 text-center">
        🚀 Start exploring now and contribute to the future of digital payments!
      </p>
    </div>
    </div>
    
  );
};