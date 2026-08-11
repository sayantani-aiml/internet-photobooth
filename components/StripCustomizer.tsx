"use client";

import type { Dispatch, SetStateAction } from "react";

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

type StickerType =
  | "hearts"
  | "stars"
  | "doodles"
  | "ribbon"
  | "flowers";

type StripCustomizerProps = {
  stripStyle: StripStyle;
  layout: StripLayout;
  decoration: Decoration;

  title: string;
  subtitle: string;

  showDate: boolean;
  showBranding: boolean;

  font: StripFont;
  customColor: string;

  decorationSize: number;

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

  onDecorationSizeChange: (
    size: number
  ) => void;

  onAddDecoration: (
    type: StickerType
  ) => void;
};


/* =========================
   PAPER STYLES
========================= */

const paperStyles: {
  id: StripStyle;
  label: string;
  color: string;
}[] = [
  {
    id: "classic",
    label: "Cream",
    color: "#f5eee1",
  },
  {
    id: "midnight",
    label: "Midnight",
    color: "#181616",
  },
  {
    id: "blush",
    label: "Blush",
    color: "#f5d9dc",
  },
  {
    id: "lavender",
    label: "Lavender",
    color: "#e5dcf4",
  },
  {
    id: "film",
    label: "Film",
    color: "#e9dfc8",
  },
];


/* =========================
   DECORATIONS
========================= */

const decorations: {
  id: Decoration;
  label: string;
  symbol: string;
}[] = [
  {
    id: "none",
    label: "None",
    symbol: "—",
  },
  {
    id: "hearts",
    label: "Hearts",
    symbol: "♡",
  },
  {
    id: "stars",
    label: "Stars",
    symbol: "✦",
  },
  {
    id: "doodles",
    label: "Doodles",
    symbol: "☁",
  },
  {
    id: "ribbon",
    label: "Ribbon",
    symbol: "🎀",
  },
  {
    id: "flowers",
    label: "Flowers",
    symbol: "✿",
  },
];


/* =========================
   COMPONENT
========================= */

export default function StripCustomizer({
  stripStyle,
  layout,
  decoration,

  title,
  subtitle,

  showDate,
  showBranding,

  font,
  customColor,

  decorationSize,

  setStripStyle,
  setLayout,
  setDecoration,

  setTitle,
  setSubtitle,

  setShowDate,
  setShowBranding,

  setFont,
  setCustomColor,

  onDecorationSizeChange,
  onAddDecoration,
}: StripCustomizerProps) {

  return (
    <div className="strip-customizer">

      {/* HEADER */}

      <div className="customizer-header">

        <p className="customizer-title">
          CUSTOMIZE YOUR STRIP
        </p>

        <span>
          ✦ make it yours
        </span>

      </div>


      {/* PAPER */}

      <div className="customizer-section">

        <p className="customizer-label">
          PAPER
        </p>

        <div className="paper-row">

          {paperStyles.map((paper) => (

            <button
              key={paper.id}
              type="button"
              className={
                stripStyle === paper.id
                  ? "paper-button selected"
                  : "paper-button"
              }
              onClick={() => {

                setStripStyle(
                  paper.id
                );

                setCustomColor(
                  paper.color
                );

              }}
            >

              <span
                className="paper-swatch"
                style={{
                  backgroundColor:
                    paper.color,
                }}
              />

              <span>
                {paper.label}
              </span>

            </button>

          ))}

        </div>

      </div>


      {/* CUSTOM COLOR */}

      <div className="custom-color-control">

        <span
          className="custom-color-preview"
          style={{
            backgroundColor:
              customColor,
          }}
        />

        <span>
          CUSTOM COLOR
        </span>

        <input
          type="color"
          value={customColor}
          onChange={(event) => {

            setCustomColor(
              event.target.value
            );

            setStripStyle(
              "classic"
            );

          }}
        />

        <span className="custom-color-value">
          {customColor.toUpperCase()}
        </span>

      </div>


      {/* LAYOUT */}

      <div className="customizer-section">

        <p className="customizer-label">
          LAYOUT
        </p>

        <div className="choice-row">

          <button
            type="button"
            className={
              layout === "classic"
                ? "choice-button selected"
                : "choice-button"
            }
            onClick={() =>
              setLayout("classic")
            }
          >

            <span className="layout-icon">
              ▤
            </span>

            Classic

          </button>


          <button
            type="button"
            className={
              layout === "grid"
                ? "choice-button selected"
                : "choice-button"
            }
            onClick={() =>
              setLayout("grid")
            }
          >

            <span className="layout-icon">
              ▦
            </span>

            Grid

          </button>

        </div>

      </div>


      {/* DECORATION */}

      <div className="customizer-section">

        <p className="customizer-label">
          ADD STICKER
        </p>

        <div className="decoration-row">

          {decorations.map((item) => (

            <button
              key={item.id}
              type="button"
              title={
                item.id === "none"
                  ? "No sticker"
                  : `Add ${item.label}`
              }
              aria-label={
                item.id === "none"
                  ? "No sticker"
                  : `Add ${item.label}`
              }
              className={
                decoration === item.id
                  ? "decoration-button selected"
                  : "decoration-button"
              }
              onClick={() => {

                if (
                  item.id === "none"
                ) {
                  setDecoration(
                    "none"
                  );

                  return;
                }

                setDecoration(
                  item.id
                );

                onAddDecoration(
                  item.id
                );

              }}
            >

              {item.symbol}

            </button>

          ))}

        </div>

        <p className="customizer-hint">
          Click to add • drag stickers
          on the strip
        </p>

      </div>


      {/* SIZE */}

      <div className="size-control">

        <div className="size-control-header">

          <span>
            STICKER SIZE
          </span>

          <span>
            {decorationSize}px
          </span>

        </div>

        <input
          type="range"
          min="14"
          max="70"
          value={decorationSize}
          onChange={(event) =>
            onDecorationSizeChange(
              Number(
                event.target.value
              )
            )
          }
        />

      </div>


      {/* TEXT */}

      <div className="customizer-section">

        <p className="customizer-label">
          TEXT
        </p>

        <div className="customizer-inputs">

          <input
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
            maxLength={32}
            placeholder="late night chaos"
          />

          <input
            value={subtitle}
            onChange={(event) =>
              setSubtitle(
                event.target.value
              )
            }
            maxLength={42}
            placeholder="with my favorite people ♡"
          />

        </div>

      </div>


      {/* FONT */}

      <div className="customizer-section">

        <p className="customizer-label">
          FONT
        </p>

        <div className="font-row">

          <button
            type="button"
            className={
              font === "classic"
                ? "font-button selected"
                : "font-button"
            }
            onClick={() =>
              setFont("classic")
            }
          >
            Classic
          </button>


          <button
            type="button"
            className={
              font === "typewriter"
                ? "font-button selected"
                : "font-button"
            }
            onClick={() =>
              setFont(
                "typewriter"
              )
            }
          >
            Typewriter
          </button>


          <button
            type="button"
            className={
              font === "handwritten"
                ? "font-button selected"
                : "font-button"
            }
            onClick={() =>
              setFont(
                "handwritten"
              )
            }
          >
            Handwritten
          </button>

        </div>

      </div>


      {/* OPTIONS */}

      <div className="customizer-section options-section">

        <label className="toggle-option">

          <input
            type="checkbox"
            checked={showDate}
            onChange={(event) =>
              setShowDate(
                event.target.checked
              )
            }
          />

          <span>
            Show date
          </span>

        </label>


        <label className="toggle-option">

          <input
            type="checkbox"
            checked={
              showBranding
            }
            onChange={(event) =>
              setShowBranding(
                event.target.checked
              )
            }
          />

          <span>
            Show “The Internet Photobooth”
          </span>

        </label>

      </div>

    </div>
  );
}