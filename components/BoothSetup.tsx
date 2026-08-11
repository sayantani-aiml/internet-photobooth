"use client";

import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export type StripLayout =
  | "classic"
  | "grid"
  | "horizontal";

type BoothSetupProps = {
  photoCount: number;
  setPhotoCount: (count: number) => void;

  layout: StripLayout;
  setLayout: (layout: StripLayout) => void;

  onStart: () => void;
  onBack: () => void;
};

const layouts: {
  id: StripLayout;
  label: string;
  description: string;
}[] = [
  {
    id: "classic",
    label: "CLASSIC",
    description: "One photo below another",
  },
  {
    id: "grid",
    label: "GRID",
    description: "Photos arranged in a grid",
  },
  {
    id: "horizontal",
    label: "HORIZONTAL",
    description: "Photos side by side",
  },
];

export default function BoothSetup({
  photoCount,
  setPhotoCount,
  layout,
  setLayout,
  onStart,
  onBack,
}: BoothSetupProps) {
  return (
    <motion.section
      className="setup screen"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
    >

      {/* HEADER */}

      <div className="setup-header">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← BACK
        </button>

        <div>
          <p className="eyebrow">
            THE INTERNET
          </p>

          <h2>
            LET'S SET UP
          </h2>
        </div>

      </div>


      {/* PHOTO COUNT */}

      <div className="setup-section">

        <p className="section-label">
          HOW MANY PHOTOS?
        </p>

        <div className="photo-count-options">

          {[2, 3, 4, 5, 6].map(
            (count) => (
              <button
                key={count}
                type="button"
                className={
                  photoCount === count
                    ? "photo-count-option selected"
                    : "photo-count-option"
                }
                onClick={() =>
                  setPhotoCount(count)
                }
              >
                {count}
              </button>
            )
          )}

        </div>

      </div>


      {/* LAYOUT */}

      <div className="setup-section">

        <p className="section-label">
          CHOOSE YOUR LAYOUT
        </p>

        <div className="layout-preview-grid">

          {layouts.map((item) => {

            const selected =
              layout === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={
                  selected
                    ? "layout-preview selected"
                    : "layout-preview"
                }
                onClick={() =>
                  setLayout(item.id)
                }
              >

                {/* DEMO */}

                <div
                  className={`layout-demo layout-demo-${item.id}`}
                >

                  {Array.from({
                    length: photoCount,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className="demo-photo"
                    >
                      <span>
                        📷
                      </span>
                    </span>
                  ))}

                </div>


                <strong>
                  {item.label}
                </strong>

                <small>
                  {item.description}
                </small>

              </button>
            );
          })}

        </div>

      </div>


      {/* START */}

      <button
        type="button"
        className="primary-button setup-start"
        onClick={onStart}
      >
        START CAMERA
        <Camera size={19} />
      </button>

      <p className="tiny-note">
        You can customize your strip
        after taking your photos ♡
      </p>

    </motion.section>
  );
}