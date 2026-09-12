"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence } from "framer-motion";

import Landing from "../components/Landing";
import CameraBooth from "../components/CameraBooth";
import BoothSetup from "../components/BoothSetup";
import PhotoStrip from "../components/PhotoStrip";
import Developing from "../components/Developing";

import { getFilterStyle } from "../lib/filters";

type Filter =
  | "classic"
  | "cherry"
  | "vintage"
  | "dream";

type Stage =
  | "landing"
  | "setup"
  | "camera"
  | "developing"
  | "result";

type StripStyle =
  | "classic"
  | "midnight"
  | "blush"
  | "lavender"
  | "film";

type StripLayout =
  | "classic"
  | "grid"
  | "horizontal";

type Decoration =
  | "none"
  | "hearts"
  | "stars"
  | "doodles"
  | "ribbon"
  | "flowers";

type StripFont =
  | "classic"
  | "typewriter"
  | "handwritten";

const prompts = [
  "okay... give us your best pose.",
  "pretend you didn't know the camera was there.",
  "chaos. immediately.",
  "one last one. make it count.",
];

const filters: {
  id: Filter;
  label: string;
  className: string;
}[] = [
  {
    id: "classic",
    label: "CLASSIC",
    className: "filter-classic",
  },
  {
    id: "cherry",
    label: "CHERRY",
    className: "filter-cherry",
  },
  {
    id: "vintage",
    label: "VINTAGE",
    className: "filter-vintage",
  },
  {
    id: "dream",
    label: "DREAM",
    className: "filter-dream",
  },
];

function dataUrlToImage(src: string) {
  return new Promise<HTMLImageElement>(
    (resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = reject;

      img.src = src;
    }
  );
}

export default function Home() {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const streamRef =
    useRef<MediaStream | null>(null);

  const [stage, setStage] =
    useState<Stage>("landing");

  const [photos, setPhotos] =
    useState<string[]>([]);

  const [photoCount, setPhotoCount] =
    useState(4);

  const [layout, setLayout] =
    useState<StripLayout>("classic");

  const [filter, setFilter] =
    useState<Filter>("classic");

  const [countdown, setCountdown] =
    useState<number | null>(null);

  const [flash, setFlash] =
    useState(false);

  const [developProgress, setDevelopProgress] =
    useState(0);

  const [memory, setMemory] =
    useState("");

  const [sound, setSound] =
    useState(true);

  const [error, setError] =
    useState("");

  const [stripStyle, setStripStyle] =
    useState<StripStyle>("classic");

  const [customColor, setCustomColor] =
    useState("#f5eee1");

  const [decoration, setDecoration] =
    useState<Decoration>("none");

  const [title, setTitle] =
    useState("late night chaos");

  const [subtitle, setSubtitle] =
    useState("");

  const [showDate, setShowDate] =
    useState(true);

  const [showBranding, setShowBranding] =
    useState(true);

  const [font, setFont] =
    useState<StripFont>("classic");

  // =========================
  // CAMERA
  // =========================

  const stopCamera =
    useCallback(() => {
      streamRef.current
        ?.getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }, []);

  const startCamera =
    useCallback(async () => {
      setError("");

      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: {
                facingMode: "user",
                width: {
                  ideal: 1280,
                },
                height: {
                  ideal: 960,
                },
              },
              audio: false,
            }
          );

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;

          await videoRef.current.play();
        }
      } catch {
        setError(
          "Camera access is needed for the photobooth. Please allow camera permission and try again."
        );
      }
    }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  useEffect(() => {
    if (stage === "camera") {
      void startCamera();
    } else {
      stopCamera();
    }
  }, [
    stage,
    startCamera,
    stopCamera,
  ]);

  // =========================
  // TAKE SINGLE PHOTO
  // =========================

  const takeSnapshot =
    useCallback(() => {
      const video =
        videoRef.current;

      const canvas =
        canvasRef.current;

      if (
        !video ||
        !canvas ||
        video.readyState < 2
      ) {
        return null;
      }

      const width =
        video.videoWidth || 1280;

      const height =
        video.videoHeight || 960;

      canvas.width = width;
      canvas.height = height;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) {
        return null;
      }

      // Mirror the front-facing camera
      ctx.save();

      ctx.translate(width, 0);
      ctx.scale(-1, 1);

      ctx.drawImage(
        video,
        0,
        0,
        width,
        height
      );

      ctx.restore();

      return canvas.toDataURL(
        "image/jpeg",
        0.92
      );
    }, []);

  // =========================
  // SOUND
  // =========================

  const playBeep =
    useCallback(() => {
      if (!sound) {
        return;
      }

      try {
        const AudioContextClass =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext?: typeof AudioContext;
            }
          ).webkitAudioContext;

        if (!AudioContextClass) {
          return;
        }

        const audioContext =
          new AudioContextClass();

        const oscillator =
          audioContext.createOscillator();

        const gain =
          audioContext.createGain();

        oscillator.frequency.value = 760;
        gain.gain.value = 0.035;

        oscillator.connect(gain);
        gain.connect(
          audioContext.destination
        );

        oscillator.start();

        oscillator.stop(
          audioContext.currentTime + 0.08
        );
      } catch {
        // Audio is optional.
      }
    }, [sound]);

  // =========================
  // FOUR-PHOTO SESSION
  // =========================

  const captureFour =
    async () => {
      if (
        countdown !== null ||
        photos.length >= photoCount
      ) {
        return;
      }

      // ONE SNAP CLICK starts the entire session
      for (
        let shot = photos.length;
        shot < photoCount;
        shot++
      ) {
        // Small pause before photos 2+
        if (shot > 0) {
          setCountdown(null);

          await new Promise(
            (resolve) =>
              setTimeout(resolve, 1000)
          );
        }

        // Countdown
        for (
          let number = 3;
          number >= 1;
          number--
        ) {
          setCountdown(number);

          playBeep();

          await new Promise(
            (resolve) =>
              setTimeout(resolve, 700)
          );
        }

        // Capture
        setCountdown(0);
        setFlash(true);

        const image =
          takeSnapshot();

        await new Promise(
          (resolve) =>
            setTimeout(resolve, 120)
        );

        setFlash(false);
        setCountdown(null);

        if (!image) {
          return;
        }

        setPhotos(
          (current) => [
            ...current,
            image,
          ]
        );
      }

      setStage("developing");
    };

  // =========================
  // DEVELOPING SCREEN
  // =========================

  useEffect(() => {
    if (stage !== "developing") {
      return;
    }

    setDevelopProgress(0);

    const start =
      performance.now();

    const duration = 2200;

    let frame = 0;

    const tick = (
      now: number
    ) => {
      const progress =
        Math.min(
          1,
          (now - start) /
            duration
        );

      setDevelopProgress(
        Math.round(progress * 100)
      );

      if (progress < 1) {
        frame =
          requestAnimationFrame(
            tick
          );
      } else {
        setTimeout(
          () =>
            setStage("result"),
          250
        );
      }
    };

    frame =
      requestAnimationFrame(
        tick
      );

    return () =>
      cancelAnimationFrame(
        frame
      );
  }, [stage]);

  // =========================
  // CURRENT FILTER
  // =========================

  const filteredClass =
    filters.find(
      (item) =>
        item.id === filter
    )?.className ??
    "filter-classic";

  // =========================
  // DOWNLOAD PHOTO STRIP
  // =========================

  const downloadStrip =
    async () => {
      if (photos.length === 0) {
        return;
      }

      const canvas =
        document.createElement(
          "canvas"
        );

      const width = 900;
      const photoW = 780;
      const photoH = 585;
      const gap = 18;
      const pad = 60;
      const footer = 170;

      canvas.width = width;

      canvas.height =
        pad +
        photos.length * photoH +
        (photos.length - 1) * gap +
        footer +
        pad;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      // Background
      ctx.fillStyle =
        "#f5eee1";

      ctx.fillRect(
        0,
        0,
        width,
        canvas.height
      );

      // Footer title
      ctx.fillStyle =
        "#191512";

      ctx.font =
        "bold 34px Georgia";

      ctx.textAlign =
        "center";

      ctx.fillText(
        "THE INTERNET PHOTOBOOTH",
        width / 2,
        canvas.height - 112
      );

      ctx.font =
        "26px Georgia";

      ctx.fillText(
        memory.trim() ||
          "a tiny memory",
        width / 2,
        canvas.height - 68
      );

      // Photos
      for (
        let index = 0;
        index < photos.length;
        index++
      ) {
        const img =
          await dataUrlToImage(
            photos[index]
          );

        const x =
          (width - photoW) / 2;

        const y =
          pad +
          index *
            (photoH + gap);

        // Filtered photo
        ctx.save();

        ctx.filter =
          getFilterStyle(
            filter
          );

        ctx.drawImage(
          img,
          x,
          y,
          photoW,
          photoH
        );

        ctx.restore();

        // Grain
        ctx.save();

        ctx.globalAlpha = 0.10;
        ctx.fillStyle =
          "#ffffff";

        for (
          let grain = 0;
          grain < 1200;
          grain++
        ) {
          const gx =
            x +
            Math.random() *
              photoW;

          const gy =
            y +
            Math.random() *
              photoH;

          const size =
            Math.random() * 1.5;

          ctx.fillRect(
            gx,
            gy,
            size,
            size
          );
        }

        ctx.restore();

        // Vignette
        ctx.save();

        const vignette =
          ctx.createRadialGradient(
            x + photoW / 2,
            y + photoH / 2,
            photoW * 0.18,
            x + photoW / 2,
            y + photoH / 2,
            photoW * 0.72
          );

        vignette.addColorStop(
          0,
          "rgba(0, 0, 0, 0)"
        );

        vignette.addColorStop(
          0.72,
          "rgba(0, 0, 0, 0.05)"
        );

        vignette.addColorStop(
          1,
          "rgba(0, 0, 0, 0.24)"
        );

        ctx.fillStyle =
          vignette;

        ctx.fillRect(
          x,
          y,
          photoW,
          photoH
        );

        ctx.restore();

        // Light leak
        if (filter !== "classic") {
          ctx.save();

          ctx.globalCompositeOperation =
            "screen";

          let leakColor =
            "255, 100, 140";

          if (filter === "vintage") {
            leakColor =
              "255, 190, 90";
          }

          if (filter === "dream") {
            leakColor =
              "200, 130, 255";
          }

          const leak =
            ctx.createLinearGradient(
              x,
              y + photoH,
              x + photoW,
              y
            );

          leak.addColorStop(
            0.35,
            "rgba(0,0,0,0)"
          );

          leak.addColorStop(
            0.48,
            `rgba(${leakColor}, 0.06)`
          );

          leak.addColorStop(
            0.52,
            `rgba(${leakColor}, 0.18)`
          );

          leak.addColorStop(
            0.58,
            `rgba(${leakColor}, 0.05)`
          );

          leak.addColorStop(
            0.68,
            "rgba(0,0,0,0)"
          );

          ctx.fillStyle =
            leak;

          ctx.filter =
            "blur(18px)";

          ctx.fillRect(
            x,
            y,
            photoW,
            photoH
          );

          ctx.restore();
        }
      }

      // Download
      const filename =
        `${
          memory.trim() ||
          "internet-photobooth"
        }`
          .replace(
            /[^a-z0-9]+/gi,
            "-"
          )
          .toLowerCase();

      const link =
        document.createElement(
          "a"
        );

      link.download =
        `${filename}.jpg`;

      link.href =
        canvas.toDataURL(
          "image/jpeg",
          0.94
        );

      link.click();
    };

  // =========================
  // RESET
  // =========================

  const reset = () => {
    stopCamera();

    setPhotos([]);

    setMemory("");

    setFilter("classic");

    setDevelopProgress(0);

    setStage("landing");
  };

  // =========================
  // UI
  // =========================

  return (
    <main className="app-shell">
      <div className="grain" />

      <div className="stars stars-one">
        ✦ · ✧ &nbsp; · &nbsp;✦
      </div>

      <div className="stars stars-two">
        · ✧ &nbsp;✦ &nbsp;·
      </div>

      <AnimatePresence mode="wait">
        {/* LANDING */}

        {stage === "landing" && (
          <Landing
            onEnter={() => {
              setPhotos([]);
              setStage("setup");
            }}
          />
        )}

        {/* SETUP */}

        {stage === "setup" && (
          <BoothSetup
            photoCount={
              photoCount
            }
            setPhotoCount={
              setPhotoCount
            }
            layout={layout}
            setLayout={setLayout}
            onStart={() => {
              setPhotos([]);
              setStage("camera");
            }}
            onBack={() => {
              setStage("landing");
            }}
          />
        )}

        {/* CAMERA */}

        {stage === "camera" && (
          <CameraBooth
            videoRef={videoRef}
            photoCount={photoCount}
            countdown={countdown}
            flash={flash}
            prompt={
              prompts[
                photos.length
              ] ?? prompts[3]
            }
            error={error}
            sound={sound}
            setSound={setSound}
            filteredClass={
              filteredClass
            }
            photosTaken={
              photos.length
            }
            onSnap={captureFour}
          />
        )}

        {/* DEVELOPING */}

        {stage ===
          "developing" && (
          <Developing
            progress={
              developProgress
            }
          />
        )}

        {/* RESULT */}

        {stage === "result" && (
          <PhotoStrip
            photos={photos}
            filter={filter}
            filters={filters}
            filteredClass={
              filteredClass
            }
            memory={memory}
            setFilter={setFilter}
            setMemory={setMemory}
            stripStyle={
              stripStyle
            }
            layout={layout}
            decoration={
              decoration
            }
            title={title}
            subtitle={
              subtitle
            }
            showDate={
              showDate
            }
            showBranding={
              showBranding
            }
            font={font}
            setStripStyle={
              setStripStyle
            }
            setLayout={
              setLayout
            }
            setDecoration={
              setDecoration
            }
            setTitle={setTitle}
            setSubtitle={
              setSubtitle
            }
            setShowDate={
              setShowDate
            }
            setShowBranding={
              setShowBranding
            }
            setFont={setFont}
            customColor={
              customColor
            }
            setCustomColor={
              setCustomColor
            }
            onDownload={
              downloadStrip
            }
            onReset={reset}
          />
        )}
      </AnimatePresence>

      {/* Hidden canvas used for taking photos */}
      <canvas
        ref={canvasRef}
        className="hidden-canvas"
      />
    </main>
  );
}