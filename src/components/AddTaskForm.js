"use client";

import { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Add a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ flexGrow: 1, padding: '0.5rem', borderRadius: '3px', border: '1px solid #ddd' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '3px', border: 'none', background: '#28a745', color: 'white', cursor: 'pointer' }}>
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
