"use client";

import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p>You have no tasks yet. Add one above!</p>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
