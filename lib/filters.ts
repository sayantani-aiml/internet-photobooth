export type Filter =
  | "classic"
  | "cherry"
  | "vintage"
  | "dream";

export function getFilterStyle(filter: Filter): string {
  switch (filter) {
    case "classic":
      return "grayscale(1) contrast(1.18) brightness(1.03)";

    case "cherry":
      return "sepia(0.12) saturate(1.65) hue-rotate(-14deg) contrast(1.08) brightness(1.03)";

    case "vintage":
      return "sepia(0.42) saturate(0.72) contrast(0.9) brightness(1.06)";

    case "dream":
      return "saturate(1.35) hue-rotate(12deg) brightness(1.1) contrast(0.92)";

    default:
      return "none";
  }
}