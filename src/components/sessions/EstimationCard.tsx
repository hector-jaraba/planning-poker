"use client";

interface EstimationCardProps {
  value: string | number;
  selected: boolean;
  onClick: () => void;
}

export default function EstimationCard({
  value,
  selected,
  onClick,
}: EstimationCardProps) {
  return (
    <button
      className={`flex h-16 w-12 items-center justify-center rounded-md text-xl font-bold transition-colors duration-200 sm:h-20 sm:w-16 ${
        selected
          ? "bg-primary-600 text-white"
          : "bg-gray-700 text-gray-200 hover:bg-gray-600"
      }`}
      onClick={(e) => {
        console.log("Estimation card clicked:", value);
        // Prevent default browser behavior
        e.preventDefault();
        // Call the onClick handler
        onClick();
      }}
    >
      {value}
    </button>
  );
}
