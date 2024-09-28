import { motion } from "framer-motion";
import React from "react";
motion
export default function Button({
    children,
    type = "button",
    bgColor = "bg-[#ff1c46]",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <motion.button className={`px-4 py-2 focus:ring-4   focus:bg-white focus:text-[#ff3358] focus:outline-none ring-[#ffd2da] rounded-lg ${bgColor} ${textColor} ${className}`} {...props}
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            
            {children}
        </motion.button>
    );
}
