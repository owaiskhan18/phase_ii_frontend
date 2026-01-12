"use client";

import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleCheckboxChange = () => {
    onUpdate(task.id, { is_completed: !task.is_completed });
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (newTitle.trim() !== task.title) {
      onUpdate(task.id, { title: newTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
    if (e.key === 'Escape') {
      setNewTitle(task.title);
      setIsEditing(false);
    }
  };

  const handleDeleteClick = () => {
    if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', padding: '0.5rem', border: '1px solid #eee', borderRadius: '3px' }}>
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={handleCheckboxChange}
        style={{ marginRight: '1rem' }}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flexGrow: 1, padding: '0.25rem', border: '1px solid #ccc' }}
        />
      ) : (
        <span
          onDoubleClick={handleTitleDoubleClick}
          style={{ flexGrow: 1, textDecoration: task.is_completed ? 'line-through' : 'none', cursor: 'pointer' }}
        >
          {task.title}
        </span>
      )}
      <button
        onClick={handleDeleteClick}
        style={{ marginLeft: '1rem', background: 'red', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '3px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
