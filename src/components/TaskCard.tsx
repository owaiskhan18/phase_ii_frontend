"use client";

import React, { useState } from "react";
import { MdEdit, MdDelete, MdCheckCircle, MdRadioButtonUnchecked, MdSave, MdCancel } from "react-icons/md";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    is_completed: boolean;
  };
  onEdit: (taskId: string, newTitle: string) => void; // Modified signature
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const isCompleted = task.is_completed;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onEdit(task.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(task.title); // Revert to original title
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    } else if (e.key === 'Escape') {
      handleCancelClick();
    }
  };

  return (
    <div
      className={`relative bg-gray-800 p-6 rounded-xl shadow-custom-dark border ${
        isCompleted ? "border-green-600" : "border-gray-700"
      } flex items-center justify-between space-x-4 transform hover:scale-102 transition-transform duration-300`}
    >
      <div className="flex items-center flex-grow">
        <button
            onClick={() => onToggleStatus(task.id)}
            className={`mr-3 text-2xl transition-colors duration-200 ${
              isCompleted ? "text-green-500" : "text-gray-500 hover:text-green-400"
            }`}
          >
            {isCompleted ? <MdCheckCircle /> : <MdRadioButtonUnchecked />}
          </button>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-1 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            autoFocus
          />
        ) : (
          <span
            className={`text-lg font-medium ${
              isCompleted ? "line-through text-gray-500" : "text-white"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="text-gray-400 hover:text-green-500 transition-colors duration-200 text-xl"
            >
              <MdSave />
            </button>
            <button
              onClick={handleCancelClick}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-xl"
            >
              <MdCancel />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="text-gray-400 hover:text-primary-500 transition-colors duration-200 text-xl"
            >
              <MdEdit />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200 text-xl"
            >
              <MdDelete />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
