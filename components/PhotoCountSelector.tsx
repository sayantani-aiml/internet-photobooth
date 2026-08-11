"use client";

type PhotoCountSelectorProps = {
  photoCount: number;
  setPhotoCount: (count: number) => void;
};

export default function PhotoCountSelector({
  photoCount,
  setPhotoCount,
}: PhotoCountSelectorProps) {
  const counts = [2, 3, 4, 5, 6];

  return (
    <div className="photo-count-section">
      <p className="customizer-label">
        NUMBER OF PHOTOS
      </p>

      <div className="photo-count-row">
        {counts.map((count) => (
          <button
            key={count}
            type="button"
            className={
              photoCount === count
                ? "choice-button selected"
                : "choice-button"
            }
            onClick={() =>
              setPhotoCount(count)
            }
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}