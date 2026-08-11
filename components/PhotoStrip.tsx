"use client";
import { toJpeg } from "html-to-image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { getFilterStyle } from "../lib/filters";
import StripCustomizer from "./StripCustomizer";
import StickerEditor from "./StickerEditor";

import {
  Download,
  Heart,
  RotateCcw,
  
} from "lucide-react";

import type {
  Dispatch,
  SetStateAction,
} from "react";

type Filter =
  | "classic"
  | "cherry"
  | "vintage"
  | "dream";

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

type FilterOption = {
  id: Filter;
  label: string;
  className: string;
};

/* --------------------------------
   STICKER TYPES
-------------------------------- */

type StickerType =
  | "hearts"
  | "stars"
  | "doodles"
  | "ribbon"
  | "flowers";

type Sticker = {
  id: number;
  type: StickerType;
  symbol: string;
  x: number;
  y: number;
  size: number;
};

/* --------------------------------
   PROPS
-------------------------------- */

type PhotoStripProps = {
  photos: string[];

  filter: Filter;
  filters: FilterOption[];
  filteredClass: string;

  memory: string;

  setFilter: Dispatch<
    SetStateAction<Filter>
  >;

  setMemory: Dispatch<
    SetStateAction<string>
  >;

  /* customization */

  stripStyle: StripStyle;
  layout: StripLayout;
  decoration: Decoration;

  title: string;
  subtitle: string;

  showDate: boolean;
  showBranding: boolean;

  font: StripFont;

  customColor: string;

  /* setters */

  setStripStyle: Dispatch<
    SetStateAction<StripStyle>
  >;

  setLayout: Dispatch<
    SetStateAction<StripLayout>
  >;

  setDecoration: Dispatch<
    SetStateAction<Decoration>
  >;

  setTitle: Dispatch<
    SetStateAction<string>
  >;

  setSubtitle: Dispatch<
    SetStateAction<string>
  >;

  setShowDate: Dispatch<
    SetStateAction<boolean>
  >;

  setShowBranding: Dispatch<
    SetStateAction<boolean>
  >;

  setFont: Dispatch<
    SetStateAction<StripFont>
  >;

  setCustomColor: Dispatch<
    SetStateAction<string>
  >;

  onDownload: () => void;

  onReset: () => void;
};

/* --------------------------------
   STICKER SYMBOLS
-------------------------------- */

const stickerSymbols: Record<
  StickerType,
  string
> = {
  hearts: "♡",
  stars: "✦",
  doodles: "☁",
  ribbon: "🎀",
  flowers: "✿",
};

/* --------------------------------
   COMPONENT
-------------------------------- */

export default function PhotoStrip({
  photos,

  filter,
  filters,
  filteredClass,

  memory,
  setFilter,
  setMemory,

  stripStyle,
  layout,
  decoration,

  title,
  subtitle,

  showDate,
  showBranding,

  font,
  customColor,

  setStripStyle,
  setLayout,
  setDecoration,

  setTitle,
  setSubtitle,

  setShowDate,
  setShowBranding,

  setFont,

  setCustomColor,

  onDownload,
  onReset,
}: PhotoStripProps) {

  const stripRef =
    useRef<HTMLDivElement>(null);

  /* --------------------------------
     STICKER STATE
  -------------------------------- */

  const [stickers, setStickers] =
    useState<Sticker[]>([]);

  const [selectedStickerId, setSelectedStickerId] =
    useState<number | null>(null);

  const [nextStickerId, setNextStickerId] =
    useState(1);

  /* --------------------------------
     ADD STICKER
  -------------------------------- */

  const addSticker = (
    type: StickerType
  ) => {

    const newSticker: Sticker = {
      id: nextStickerId,

      type,

      symbol: stickerSymbols[type],

      /*
        Start each sticker at a
        slightly different position.
      */

      x: 50 + (nextStickerId * 7) % 30,

      y: 15 + (nextStickerId * 11) % 65,

      size: 30,
    };

    setStickers((current) => [
      ...current,
      newSticker,
    ]);

    setSelectedStickerId(
      newSticker.id
    );

    setNextStickerId(
      (current) => current + 1
    );
  };

  /* --------------------------------
     SELECT STICKER
  -------------------------------- */

  const selectSticker = (
    id: number
  ) => {
    setSelectedStickerId(id);
  };

  /* --------------------------------
     DELETE STICKER
  -------------------------------- */

  const deleteSticker = () => {

    if (
      selectedStickerId === null
    ) {
      return;
    }

    setStickers((current) =>
      current.filter(
        (sticker) =>
          sticker.id !==
          selectedStickerId
      )
    );

    setSelectedStickerId(null);
  };

  /* --------------------------------
     UPDATE STICKER SIZE
  -------------------------------- */

  const updateStickerSize = (
    size: number
  ) => {

    if (
      selectedStickerId === null
    ) {
      return;
    }

    setStickers((current) =>
      current.map((sticker) =>
        sticker.id ===
        selectedStickerId
          ? {
              ...sticker,
              size,
            }
          : sticker
      )
    );
  };
  

  /* --------------------------------
     UPDATE STICKER POSITION
  -------------------------------- */

  const updateStickerPosition = (
    id: number,
    x: number,
    y: number
  ) => {

    setStickers((current) =>
      current.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              x,
              y,
            }
          : sticker
      )
    );
  };
  

  /* --------------------------------
     CURRENT SELECTED STICKER
  -------------------------------- */

  const selectedSticker =
    stickers.find(
      (sticker) =>
        sticker.id ===
        selectedStickerId
    );

  const decorationSize =
    selectedSticker?.size ?? 30;

   const downloadCurrentStrip = async () => {
    if (!stripRef.current) return;

    try {
      await document.fonts.ready;

      const dataUrl = await toJpeg(
        stripRef.current,
        {
          quality: 0.95,
          pixelRatio: 2,
          cacheBust: true,
          backgroundColor:
            customColor || "#f5eee1",
        }
      );

      const link = document.createElement("a");

      link.download =
        `${(
          memory.trim() ||
          "internet-photobooth"
        )
          .replace(/[^a-z0-9]+/gi, "-")
          .toLowerCase()}.jpg`;

      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(
        "Failed to download strip:",
        error
      );
    }
  };


  /* --------------------------------
     JSX START
  -------------------------------- */

  return (
    <motion.section
      key="result"
      className="result screen"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >

      {/* HEADER */}

      <div className="result-header">

        <p className="eyebrow">
          YOU MADE A MEMORY ✦
        </p>

        <button
          className="icon-button"
          onClick={onReset}
          aria-label="Take another"
        >
          <RotateCcw size={18} />
        </button>

      </div>

      {/* PHOTO STRIP */}

      <motion.div
        ref={stripRef}
        className={`photo-strip strip-style-${stripStyle} layout-${layout}`}

        style={{
          backgroundColor:
            customColor,
        }}

        initial={{
          y: 100,
          rotate: 2,
          opacity: 0,
        }}

        animate={{
          y: 0,
          rotate: -1,
          opacity: 1,
        }}

        transition={{
          type: "spring",
          damping: 15,
        }}
      >

        {/* PHOTOS */}

        {photos.map(
          (photo, i) => (
            <div
              className={`strip-photo ${filteredClass}`}
              key={`${photo}-${i}`}
            >

              <img
                src={photo}
                alt={`Photobooth shot ${i + 1}`}
                style={{
                  filter:
                    getFilterStyle(
                      filter
                    ),
                }}
              />

              <span
                className="film-grain"
                aria-hidden="true"
              />

              <span
                className="photo-vignette"
                aria-hidden="true"
              />

              <span
                className={`light-leak light-leak-${filter}`}
                aria-hidden="true"
              />

            </div>
          )
        )}

        {/* FOOTER */}

        <div className="strip-footer">

          {showBranding && (
            <strong>
              {title ||
                "THE INTERNET"}

              <br />

              {subtitle ||
                "PHOTOBOOTH"}
            </strong>
          )}

          <span>
            ♥
          </span>

          <small>
            {memory.trim() ||
              "a tiny memory"}
          </small>

        </div>

      <StickerEditor
  stickers={stickers}
  selectedStickerId={selectedStickerId}
  stripRef={stripRef}
  onSelect={selectSticker}
  onMove={updateStickerPosition}
  onDelete={deleteSticker}
/>
      </motion.div>
            {/* FILTERS */}

      <div className="filter-panel">

        <p className="section-label">
          CHOOSE YOUR FILTER
        </p>

        <div className="filter-row">

          {filters.map((f) => (

            <button
              key={f.id}

              className={`filter-choice ${
                filter === f.id
                  ? "selected"
                  : ""
              }`}

              onClick={() =>
                setFilter(f.id)
              }
            >

              <span
                className={`filter-thumb ${f.className}`}
              >

                <img
                  src={photos[0]}
                  alt=""
                />

              </span>

              <span>
                {f.label}
              </span>

            </button>

          ))}

        </div>

      </div>


      {/* CUSTOMIZER */}

      <StripCustomizer

        stripStyle={
          stripStyle
        }

        layout={
          layout
        }

        decoration={
          decoration
        }

        title={
          title
        }

        subtitle={
          subtitle
        }

        showDate={
          showDate
        }

        showBranding={
          showBranding
        }

        font={
          font
        }

        customColor={
          customColor
        }


        decorationSize={
          decorationSize
        }


        setStripStyle={
          setStripStyle
        }

        setLayout={
          setLayout
        }

        setDecoration={
          setDecoration
        }

        setTitle={
          setTitle
        }

        setSubtitle={
          setSubtitle
        }

        setShowDate={
          setShowDate
        }

        setShowBranding={
          setShowBranding
        }

        setFont={
          setFont
        }

        setCustomColor={
          setCustomColor
        }


        onDecorationSizeChange={
  updateStickerSize
}

onAddDecoration={
  addSticker
}

      />


      {/* STICKER CONTROLS */}

      <div className="sticker-controls">

        <div className="sticker-control-header">

          <span className="section-label">
            STICKER
          </span>

          {selectedSticker ? (
            <span className="selected-sticker-label">
              {selectedSticker.symbol}
            </span>
          ) : (
            <span className="selected-sticker-label">
              Select one
            </span>
          )}

        </div>


        {/* ADD STICKERS */}

        <div className="sticker-add-row">

          <button
            type="button"
            className="sticker-add-button"
            onClick={() =>
              addSticker("hearts")
            }
            title="Add heart"
          >
            ♡
          </button>


          <button
            type="button"
            className="sticker-add-button"
            onClick={() =>
              addSticker("stars")
            }
            title="Add star"
          >
            ✦
          </button>


          <button
            type="button"
            className="sticker-add-button"
            onClick={() =>
              addSticker("doodles")
            }
            title="Add doodle"
          >
            ☁
          </button>


          <button
            type="button"
            className="sticker-add-button"
            onClick={() =>
              addSticker("ribbon")
            }
            title="Add ribbon"
          >
            🎀
          </button>


          <button
            type="button"
            className="sticker-add-button"
            onClick={() =>
              addSticker("flowers")
            }
            title="Add flower"
          >
            ✿
          </button>

        </div>


        {/* DELETE SELECTED */}

        {selectedSticker && (

          <button
            type="button"
            className="delete-sticker-button"
            onClick={
              deleteSticker
            }
          >

           
        

          </button>

        )}

      </div>


      {/* MEMORY NAME */}

      <div className="memory-panel">

        <p className="section-label">
          NAME YOUR MEMORY
        </p>


        <div className="memory-input-wrap">

          <input
            value={
              memory
            }

            onChange={(e) =>
              setMemory(
                e.target.value
              )
            }

            maxLength={32}

            placeholder="late night chaos"
          />


          <Heart size={17} />

        </div>


        {showDate && (

          <p className="date">

            {new Intl.DateTimeFormat(
              "en-US",
              {
                month:
                  "long",

                day:
                  "numeric",

                year:
                  "numeric",
              }
            ).format(
              new Date()
            )}

          </p>

        )}

      </div>


      {/* ACTIONS */}

      <div className="actions">

        <button
  className="primary-button"
  onClick={downloadCurrentStrip}
>
  <Download size={18} />
  DOWNLOAD STRIP
</button>

        


        <button
          className="secondary-button"
          onClick={
            onReset
          }
        >

          <RotateCcw
            size={17}
          />

          TAKE ANOTHER

        </button>

      </div>


      {/* PRIVACY */}

      <p className="privacy">

        <span>
          🔒 photos stay on your device
        </span>

        <span>
          ☻ no sign up required
        </span>

        <span>
          ✦ works on desktop & mobile
        </span>

      </p>

    </motion.section>
  );
}
