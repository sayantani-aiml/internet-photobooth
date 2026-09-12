"use client";

import type {
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";

import { motion } from "framer-motion";

import {
  Camera,
  Volume2,
  VolumeX,
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
  onSnap,
}: CameraBoothProps) {
  return (
    <motion.section
      key="camera"
      className="camera-stage screen"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      {/* =========================
          TOP BAR
         ========================= */}

      <header className="topbar">
        <span className="rec">
          <i />
          REC
        </span>

        <span>
          {Math.min(
            photosTaken + 1,
            photoCount
          )}{" "}
          of {photoCount}
        </span>

        <button
          type="button"
          className="icon-button"
          onClick={() =>
            setSound((s) => !s)
          }
          aria-label="Toggle sound"
        >
          {sound ? (
            <Volume2 size={18} />
          ) : (
            <VolumeX size={18} />
          )}
        </button>
      </header>

      {/* =========================
          CAMERA
         ========================= */}

      <div className="camera-frame">
        <video
          ref={videoRef}
          className="camera-video"
          playsInline
          muted
        />

        {/* EXISTING COLOR FILTER */}

        <div
          className={`view-filter ${filteredClass}`}
        />

        {/* CAMERA CORNERS */}

        <div className="camera-corner corner-tl" />
        <div className="camera-corner corner-tr" />
        <div className="camera-corner corner-bl" />
        <div className="camera-corner corner-br" />

        {/* COUNTDOWN */}

        {countdown !== null && (
          <motion.div
            key={countdown}
            className="countdown"
            initial={{
              scale: 1.5,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {countdown === 0
              ? "FLASH!"
              : countdown}
          </motion.div>
        )}

        {/* CAMERA FLASH */}

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

      {/* =========================
          PROMPT
         ========================= */}

      <p className="prompt">
        {prompt}
      </p>

      {/* =========================
          CAMERA ERROR
         ========================= */}

      {error && (
        <p className="camera-error">
          {error}
        </p>
      )}

      {/* =========================
          SNAP BUTTON
         ========================= */}

      <button
        type="button"
        className="snap-button"
        onClick={onSnap}
        disabled={
          countdown !== null ||
          !!error
        }
      >
        <Camera size={21} />
        SNAP
      </button>

      {/* =========================
          PHOTO PROGRESS
         ========================= */}

      <div className="progress-dots">
        {Array.from(
          { length: photoCount },
          (_, index) => (
            <span
              key={index}
              className={
                index < photosTaken
                  ? "done"
                  : ""
              }
            />
          )
        )}
      </div>
    </motion.section>
  );
} 