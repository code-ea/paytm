import { motion } from "framer-motion";
import { useState, forwardRef } from "react";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

export const InputBox = forwardRef(({
  label,
  placeholder,
  onChange,
  type = "text",
  error = null,
  className = "",
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <motion.div 
      className={`mb-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-2 rounded-lg border ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : isFocused
              ? "border-blue-500 focus:ring-blue-500 focus:border-blue-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } shadow-sm focus:outline-none focus:ring-2 transition-all duration-200`}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mt-1 text-sm text-red-600"
        >
          <FiAlertCircle className="mr-1" />
          {error}
        </motion.div>
      )}
    </motion.div>
  );
});