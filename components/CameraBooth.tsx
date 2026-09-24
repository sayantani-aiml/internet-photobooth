"use client";

import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Camera,
  Volume2,
  VolumeX,
  RotateCcw,
  Grid3X3,
  Minus,
  Plus,
} from "lucide-react";

type CameraBoothProps = {
  videoRef: RefObject<HTMLVideoElement | null>;

  photoCount: number;
  countdown: number | null;
  flash: boolean;
  prompt: string;
  error: string;

  sound: boolean;
  setSound: Dispatch<SetStateAction<boolean>>;

  filteredClass: string;
  photosTaken: number;

  // ADD THIS
  photos: string[];

  onSnap: () => void;
};
export default function CameraBooth({
  videoRef,
  photoCount,
  countdown,
  flash,
  prompt,
  error,
  sound,
  setSound,
  filteredClass,
  photosTaken,

  // ADD THIS
  photos,

  onSnap,
}: CameraBoothProps)  {
  const [zoom, setZoom] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  /*
   * Make sure the video actually starts playing
   * after the DOM element has mounted.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    setVideoReady(false);

    const handleLoaded = async () => {
      try {
        await video.play();
        setVideoReady(true);
      } catch (err) {
        console.error("Video playback failed:", err);
      }
    };

    video.addEventListener(
      "loadedmetadata",
      handleLoaded
    );

    if (video.readyState >= 2) {
      void handleLoaded();
    }

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        handleLoaded
      );
    };
  }, [videoRef]);

  return (
    <motion.section
      key="camera"
      className="camera-stage screen"
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
      }}
    >
      {/* =====================================
          DECORATIVE BACKGROUND
         ===================================== */}

      <div className="camera-decoration camera-star-one">
        ✦
      </div>

      <div className="camera-decoration camera-star-two">
        ✧
      </div>

      <div className="camera-decoration camera-heart">
        ♡
      </div>

      {/* =====================================
          TOP BAR
         ===================================== */}

      <header className="camera-topbar">
        <span className="rec-indicator">
          <i />
          REC
        </span>

        <div className="shot-counter">
          <strong>
            {String(
              Math.min(photosTaken + 1, photoCount)
            ).padStart(2, "0")}
          </strong>

          <span>/</span>

          <strong>
            {String(photoCount).padStart(2, "0")}
          </strong>

          <small>
            little moment no. {Math.min(
              photosTaken + 1,
              photoCount
            )}
          </small>
        </div>

        <button
          type="button"
          className="glass-icon-button"
          onClick={() =>
            setSound((current) => !current)
          }
          aria-label="Toggle sound"
        >
          {sound ? (
            <Volume2 size={17} />
          ) : (
            <VolumeX size={17} />
          )}
        </button>
      </header>

      {/* =====================================
          MAIN CAMERA AREA
         ===================================== */}

      <div className="booth-camera-layout">

        {/* PHOTO PREVIEW RAIL */}

        <aside className="photo-preview-rail">
          <div className="preview-label">
            memories
          </div>

          <div className="preview-slots">
            {Array.from(
              { length: photoCount },
              (_, index) => {
              const image = photos?.[index];
              {Array.from({ length: photoCount }, (_, index) => {
  const image = photos?.[index];

  return (
    <motion.div
      key={index}
      className={`photo-preview ${
        index === photosTaken ? "active" : ""
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={`Memory ${index + 1}`}
        />
      ) : (
        <div className="empty-preview">
          <span>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
    </motion.div>
  );
})}

                return (
                  <motion.div
                    key={index}
                    className={`preview-slot ${
                      index === photosTaken
                        ? "preview-current"
                        : ""
                    } ${
                      image
                        ? "preview-filled"
                        : ""
                    }`}
                    animate={
                      index === photosTaken
                        ? {
                            scale: [1, 1.04, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.8,
                      repeat:
                        index === photosTaken
                          ? Infinity
                          : 0,
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`Captured photo ${
                          index + 1
                        }`}
                      />
                    ) : (
                      <span>
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    )}

                    <small>
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </small>
                  </motion.div>
                );
              }
            )}
          </div>
        </aside>

        {/* CAMERA COLUMN */}

        <div className="camera-column">

          {/* CAMERA FRAME */}

          <div className="camera-frame">

            <video
              ref={videoRef}
              className={`camera-video ${
                flipped
                  ? "camera-flipped"
                  : ""
              }`}
              playsInline
              autoPlay
              muted
              onCanPlay={() =>
                setVideoReady(true)
              }
              style={{
                transform: `
                  scaleX(${flipped ? -1 : 1})
                  scale(${zoom})
                `,
              }}
            />

            {/* Filter */}

            <div
              className={`view-filter ${filteredClass}`}
            />

            {/* Grid */}

            {showGrid && (
              <div className="camera-grid">
                {Array.from(
                  { length: 9 },
                  (_, index) => (
                    <span key={index} />
                  )
                )}
              </div>
            )}

            {/* Corners */}

            <div className="camera-corner corner-tl" />
            <div className="camera-corner corner-tr" />
            <div className="camera-corner corner-bl" />
            <div className="camera-corner corner-br" />

            {/* Camera status */}

            {!videoReady && !error && (
              <div className="camera-loading">
                <div className="loading-ring" />
                <span>
                  opening the booth...
                </span>
              </div>
            )}

            {/* Countdown */}

            {countdown !== null && (
              <motion.div
                key={countdown}
                className="countdown"
                initial={{
                  scale: 1.45,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.22,
                }}
              >
                {countdown === 0
                  ? "✦"
                  : countdown}
              </motion.div>
            )}

            {/* Flash */}

            {flash && (
              <motion.div
                className="flash"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              />
            )}
          </div>

          {/* =================================
              CAMERA CONTROLS
             ================================= */}

          <div className="camera-controls">

            {/* Zoom */}

            <div className="zoom-control">
              <button
                type="button"
                onClick={() =>
                  setZoom((value) =>
                    Math.max(
                      1,
                      Number(
                        (value - 0.1).toFixed(1)
                      )
                    )
                  )
                }
                disabled={zoom <= 1}
              >
                <Minus size={14} />
              </button>

              <span>
                {zoom.toFixed(1)}×
              </span>

              <button
                type="button"
                onClick={() =>
                  setZoom((value) =>
                    Math.min(
                      1.6,
                      Number(
                        (value + 0.1).toFixed(1)
                      )
                    )
                  )
                }
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Flip */}

            <button
              type="button"
              className="glass-control-button"
              onClick={() =>
                setFlipped((value) => !value)
              }
            >
              <RotateCcw size={14} />
              Flip
            </button>

            {/* Grid */}

            <button
              type="button"
              className={`glass-control-button ${
                showGrid
                  ? "control-active"
                  : ""
              }`}
              onClick={() =>
                setShowGrid((value) => !value)
              }
            >
              <Grid3X3 size={14} />
              Grid
            </button>
          </div>

          {/* Prompt */}

          <p className="prompt">
            {prompt}
          </p>

          {/* Error */}

          {error && (
            <div className="camera-error">
              {error}
            </div>
          )}

          {/* SNAP */}

          <motion.button
            type="button"
            className="snap-button"
            onClick={onSnap}
            disabled={
              countdown !== null ||
              !!error ||
              !videoReady
            }
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <Camera size={18} />
            <span>SNAP</span>
            <span className="snap-arrow">
              →
            </span>
          </motion.button>

          {/* Mood label */}

          <div className="mood-label">
            <span>✦</span>
            choose your mood
            <span>✦</span>
          </div>

          {/* Progress */}

          <div className="progress-dots">
            {Array.from(
              { length: photoCount },
              (_, index) => (
                <span
                  key={index}
                  className={
                    index < photosTaken
                      ? "done"
                      : index === photosTaken
                      ? "current"
                      : ""
                  }
                >
                  {index + 1}
                </span>
              )
            )}
          </div>

          <p className="camera-footer-note">
            made for silly poses & good memories ♡
          </p>
        </div>
      </div>

      {/* Hidden canvas remains elsewhere in parent */}
    </motion.section>
  );
}