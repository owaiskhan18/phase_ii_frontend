"use client";

import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
  isLoading: boolean;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, isLoading }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim());
      setTaskTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-8"
    >
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="flex-grow p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md text-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading || !taskTitle.trim()}
      >
        {isLoading ? "Adding..." : <><MdAdd /> Add Task</>}
      </button>
    </form>
  );
};

export default AddTaskForm;
