"use client";

import React from "react";

interface TaskFilterProps {
  currentFilter: "all" | "completed" | "incomplete";
  onFilterChange: (filter: "all" | "completed" | "incomplete") => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Incomplete", value: "incomplete" },
  ];

  return (
    <div className="flex justify-center md:justify-start space-x-2 p-1 bg-gray-700 rounded-lg shadow-inner">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value as "all" | "completed" | "incomplete")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            currentFilter === filter.value
              ? "bg-primary-600 text-white shadow-md"
              : "text-gray-300 hover:bg-gray-600"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
