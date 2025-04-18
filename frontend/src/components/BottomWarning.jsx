import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertCircle, FiArrowRight } from "react-icons/fi";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-3 px-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-center text-sm text-yellow-800 shadow-sm"
    >
      <FiAlertCircle className="mr-2 flex-shrink-0 text-yellow-500" />
      <div className="mr-1">{label}</div>
      <motion.div whileHover={{ x: 2 }}>
        <Link
          to={to}
          className="font-medium text-yellow-700 hover:text-yellow-900 underline flex items-center"
        >
          {buttonText}
          <FiArrowRight className="ml-1" size={14} />
        </Link>
      </motion.div>
    </motion.div>
  );
}