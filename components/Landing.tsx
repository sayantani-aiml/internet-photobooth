"use client";

import { Camera } from "lucide-react";
import { motion } from "framer-motion";

type LandingProps = {
  onEnter: () => void;
};

export default function Landing({
  onEnter,
}: LandingProps) {
  return (
    <motion.section
      className="landing screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
      }}
    >
      {/* DECORATIVE DOTS */}

      <div className="landing-dots">
        ● ● ● ● ● ● ● ●
      </div>

      {/* COPY */}

      <div className="landing-copy">
        <p className="eyebrow">
          THE INTERNET
        </p>

        <h1>
          PHOTOBOOTH
        </h1>

        <p className="tagline">
          four photos.
          <br />
          one tiny memory.
        </p>
      </div>

      {/* BOOTH */}

      <div className="booth-illustration">

        <div className="booth-sign">
          PHOTOS
        </div>

        <div className="booth-curtain">
          <span>✦</span>
        </div>

        <div className="booth-price">
          4 POSES
          <br />

          <span>
            $0.00
          </span>

          <br />

          SMILE! →
        </div>

      </div>

      {/* ENTER */}

      <button
        type="button"
        className="primary-button enter-button"
        onClick={onEnter}
      >
        ENTER BOOTH
        <Camera size={19} />
      </button>

      {/* NOTE */}

      <p className="tiny-note">
        ♡ made with love on the internet ♡
      </p>

    </motion.section>
  );
}