import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navbar } from "./Navbar";

export const About = () => {
  // Animation controls for each section
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const featureVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-4xl mx-auto py-10 px-6"
      >
        {/* Hero Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Paytm Clone
          </motion.h1>
          
          <motion.div
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
            className="inline-block"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-gray-700 text-lg mb-4"
            variants={itemVariants}
          >
            Welcome to the <span className="font-bold text-blue-600">Paytm Clone</span>, a web-based digital wallet
            and payment system inspired by the popular fintech platform{" "}
            <span className="font-bold text-purple-600">Paytm</span>. This project aims to replicate key
            functionalities in a modern, animated web application.
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            ✨ Key Features
          </motion.h2>
          
          <motion.ul 
            className="grid md:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {[
              "🔐 Secure Signup & Login with JWT authentication",
              "💰 Wallet Management - Add, Send, & Receive Payments",
              "📊 Transaction History to track payments",
              "🛠️ Admin Dashboard for managing users & transactions",
              "📱 Responsive UI built with React & Tailwind CSS",
              "🎨 Interactive animations with Framer Motion"
            ].map((feature, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={featureVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section variants={itemVariants} className="mb-12">
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            🛠️ Tech Stack
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
            variants={containerVariants}
          >
            {[
              { name: "React.js", color: "from-blue-400 to-blue-600" },
              { name: "Tailwind CSS", color: "from-teal-400 to-teal-600" },
              { name: "Node.js", color: "from-green-400 to-green-600" },
              { name: "Express.js", color: "from-gray-400 to-gray-600" },
              { name: "MongoDB", color: "from-green-500 to-green-700" },
              { name: "JWT", color: "from-purple-400 to-purple-600" },
              { name: "Framer Motion", color: "from-pink-400 to-pink-600" },
              { name: "React Icons", color: "from-yellow-400 to-yellow-600" }
            ].map((tech, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={featureVariants}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-r ${tech.color} text-white p-3 rounded-lg shadow-md`}
              >
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* How It Works */}
        <motion.section variants={itemVariants} className="mb-12">
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            📱 How It Works
          </motion.h2>
          
          <motion.ol 
            className="space-y-4 relative"
            variants={containerVariants}
          >
            <div className="absolute left-5 top-0 h-full w-0.5 bg-blue-200 -z-10"></div>
            {[
              "Sign up for an account",
              "Login to access your wallet",
              "Add money to your account",
              "Send or receive payments instantly",
              "Check your transaction history"
            ].map((step, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={featureVariants}
                className="flex items-start"
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                    {i + 1}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.section>

        {/* Installation */}
        <motion.section variants={itemVariants} className="mb-12">
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            ⚙️ Installation & Setup
          </motion.h2>
          
          <motion.pre 
            className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm md:text-base relative"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <button className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              Copy
            </button>
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
          </motion.pre>
        </motion.section>

        {/* Future Enhancements */}
        <motion.section variants={itemVariants} className="mb-12">
          <motion.h2 
            className="text-2xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            🔮 Future Enhancements
          </motion.h2>
          
          <motion.div 
            className="grid gap-4"
            variants={containerVariants}
          >
            {[
              { icon: "💳", text: "Payment Gateway Integration (Razorpay, Stripe)" },
              { icon: "🔲", text: "QR Code-based Transactions" },
              { icon: "📱", text: "Recharge & Bill Payments" },
              { icon: "🤖", text: "AI-powered Expense Tracker" }
            ].map((enhancement, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={featureVariants}
                whileHover={{ x: 5 }}
                className="flex items-center p-3 bg-white rounded-lg shadow-sm"
              >
                <span className="text-2xl mr-3">{enhancement.icon}</span>
                <span>{enhancement.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Conclusion */}
        <motion.section 
          variants={itemVariants}
          className="text-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🚀 Ready to Explore?
          </motion.h2>
          <p className="text-lg mb-4">
            The <strong>Paytm Clone</strong> project is a step towards building a{" "}
            <strong>secure and user-friendly digital wallet</strong>.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-lg mt-4"
          >
            Get Started Now
          </motion.button>
        </motion.section>
      </motion.div>
    </div>
  );
};