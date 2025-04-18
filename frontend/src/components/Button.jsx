import { motion } from "framer-motion";

export function Button({ label, onClick, className = "", variant = "primary", disabled = false, icon, type = "button" }) {
  // Variant styles
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600",
    success: "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600",
    danger: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600",
    warning: "bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600",
    ghost: "bg-transparent border border-gray-300 hover:bg-gray-100",
  };

  // Base classes
  const baseClasses = "text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center space-x-2";

  // Disabled state
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantStyles[variant]} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </motion.button>
  );
}