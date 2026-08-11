"use client";

import { useRef } from "react";
import type { RefObject } from "react";

export type StickerType =
  | "hearts"
  | "stars"
  | "doodles"
  | "ribbon"
  | "flowers";

export type Sticker = {
  id: number;
  type: StickerType;
  symbol: string;
  x: number;
  y: number;
  size: number;
};

type StickerEditorProps = {
  stickers: Sticker[];
  selectedStickerId: number | null;

  stripRef: RefObject<HTMLDivElement | null>;

  onSelect: (id: number) => void;

  onMove: (
    id: number,
    x: number,
    y: number
  ) => void;

  onDelete: (id: number) => void;
};

export default function StickerEditor({
  stickers,
  selectedStickerId,
  stripRef,
  onSelect,
  onMove,
  onDelete,
}: StickerEditorProps) {
  const draggingId = useRef<number | null>(null);

  const pointerOffset = useRef({
    x: 0,
    y: 0,
  });

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    sticker: Sticker
  ) => {
    event.stopPropagation();

    const strip = stripRef.current;

    if (!strip) return;

    onSelect(sticker.id);

    const rect =
      strip.getBoundingClientRect();

    // Current sticker center in pixels
    const stickerCenterX =
      rect.left +
      (sticker.x / 100) * rect.width;

    const stickerCenterY =
      rect.top +
      (sticker.y / 100) * rect.height;

    // Remember exactly where inside the sticker
    // the user grabbed it.
    pointerOffset.current = {
      x: event.clientX - stickerCenterX,
      y: event.clientY - stickerCenterY,
    };

    draggingId.current = sticker.id;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
    sticker: Sticker
  ) => {
    if (
      draggingId.current !== sticker.id
    ) {
      return;
    }

    const strip = stripRef.current;

    if (!strip) return;

    const rect =
      strip.getBoundingClientRect();

    // Mouse position minus the point
    // where the sticker was grabbed.
    const centerX =
      event.clientX -
      pointerOffset.current.x;

    const centerY =
      event.clientY -
      pointerOffset.current.y;

    // Convert pixels → percentage
    let x =
      ((centerX - rect.left) /
        rect.width) *
      100;

    let y =
      ((centerY - rect.top) /
        rect.height) *
      100;

    // Keep sticker inside the strip.
    x = Math.max(2, Math.min(98, x));
    y = Math.max(2, Math.min(98, y));

    onMove(
      sticker.id,
      x,
      y
    );
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
    sticker: Sticker
  ) => {
    if (
      draggingId.current !== sticker.id
    ) {
      return;
    }

    draggingId.current = null;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  return (
    <>
      {stickers.map((sticker) => {
        const selected =
          sticker.id ===
          selectedStickerId;

        return (
          <div
            key={sticker.id}
            onPointerDown={(event) =>
              handlePointerDown(
                event,
                sticker
              )
            }
            onPointerMove={(event) =>
              handlePointerMove(
                event,
                sticker
              )
            }
            onPointerUp={(event) =>
              handlePointerUp(
                event,
                sticker
              )
            }
            onPointerCancel={(event) =>
              handlePointerUp(
                event,
                sticker
              )
            }
            style={{
              position: "absolute",

              left: `${sticker.x}%`,
              top: `${sticker.y}%`,

              transform:
                "translate(-50%, -50%)",

              fontSize:
                `${sticker.size}px`,

              lineHeight: 1,

              zIndex: selected
                ? 100
                : 20,

              cursor: "grab",

              userSelect: "none",
              WebkitUserSelect:
                "none",

              touchAction: "none",

              outline: selected
                ? "2px dashed rgba(255,255,255,.9)"
                : "none",

              outlineOffset: "6px",

              // Makes dragging feel responsive.
              willChange:
                "left, top",
            }}
          >
            {sticker.symbol}

            {selected && (
              <button
                type="button"
                onPointerDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onDelete(
                    sticker.id
                  );
                }}
                aria-label="Delete sticker"
                title="Delete sticker"
                style={{
                  position:
                    "absolute",

                  top: "-12px",
                  right: "-18px",

                  width: "24px",
                  height: "24px",

                  borderRadius:
                    "50%",

                  border: "none",

                  background:
                    "#191512",

                  color: "white",

                  fontSize: "14px",

                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",

                  cursor: "pointer",

                  boxShadow:
                    "0 3px 10px rgba(0,0,0,.3)",

                  zIndex: 200,
                }}
              >
                ×
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}