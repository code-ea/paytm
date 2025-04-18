import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

export function Heading({ label, className = "", animate = true, ...props }) {
  const Component = animate ? motion.div : "div";
  
  return (
    <Component
      initial={animate ? { opacity: 0, y: -20 } : {}}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={animate ? { duration: 0.5 } : {}}
      className={`font-bold text-3xl md:text-4xl lg:text-5xl pt-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}
      {...props}
    >
      {label}
    </Component>
  );
}