import { useState } from "react";

const StarRating = ({
  rating = 0,
  onRatingChange,
  size = "text-2xl",
  readonly = false,
}) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const numericRating = Number(rating);

  const safeRating =
    !isNaN(numericRating)
      ? Math.max(0, Math.min(5, numericRating))
      : 0;
  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => !readonly && setHoveredStar(null)}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const isActive =
          hoveredStar !== null
            ? i <= hoveredStar
            : i <= safeRating;

        const hasHalfStar = safeRating % 1 !== 0 && Math.ceil(safeRating) === i;
        const isHalfActive = safeRating >= i - 0.5 && safeRating < i;

        return (
          <div key={i} className="relative inline-block">
            <span
              role={!readonly ? "button" : undefined}
              tabIndex={!readonly ? 0 : -1}
              className={`transition-colors duration-200 inline-block w-6 ${
                readonly ? "cursor-default" : "cursor-pointer"
              } ${size} ${
                isActive ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => !readonly && onRatingChange?.(i)}
              onMouseEnter={() => !readonly && setHoveredStar(i)}
            >
              ★
            </span>
            {!readonly && (
              <span
                className="absolute top-0 left-0 w-3 h-full overflow-hidden cursor-pointer"
                onClick={() => !readonly && onRatingChange?.(i - 0.5)}
                onMouseEnter={() => !readonly && setHoveredStar(i - 0.5)}
              >
                <span className={`transition-colors duration-200 ${size} ${
                  hoveredStar !== null
                    ? i - 0.5 <= hoveredStar
                    : isHalfActive
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}>
                  ★
                </span>
              </span>
            )}
          </div>
        );
      })}

      <span className="ml-2 text-sm text-gray-600">
        {safeRating === 0 ? "Not rated" : `${safeRating.toFixed(1)}/5.0`}
      </span>
    </div>
  );
};

export default StarRating;