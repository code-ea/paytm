import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

export function SubHeading({ 
  label, 
  className = "", 
  animate = true, 
  withIcon = false,
  icon = <FiChevronRight className="text-blue-500" />,
  ...props 
}) {
  const Component = animate ? motion.div : "div";
  
  return (
    <Component
      initial={animate ? { opacity: 0, x: -10 } : {}}
      animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={animate ? { duration: 0.5, delay: 0.2 } : {}}
      className={`text-slate-500 dark:text-slate-400 text-md md:text-lg pt-1 px-4 pb-4 flex items-center ${className}`}
      {...props}
    >
      {withIcon && (
        <span className="mr-2">
          {icon}
        </span>
      )}
      {label}
    </Component>
  );
}