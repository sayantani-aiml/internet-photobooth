"use client";

import { motion } from "framer-motion";
import { WandSparkles } from "lucide-react";

type DevelopingProps = {
  progress: number;
};

export default function Developing({
  progress,
}: DevelopingProps) {
  return (
    <motion.section
      key="developing"
      className="developing screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <WandSparkles
        size={24}
        className="develop-icon"
      />

      <p className="develop-text">
        developing your photos...
      </p>

      <div className="develop-bar">
        <span
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="percent">
        {progress}%
      </p>

      <div className="printer">
        <div className="printer-slot" />

        <motion.div
          className="paper-peek"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.section>
  );
}