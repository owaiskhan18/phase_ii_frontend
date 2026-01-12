"use client";

import React from "react";
import TaskCard from "./TaskCard"; // Adjust path as needed

interface Task {
  id: string;
  title: string;
  is_completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string, newTitle: string) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div
        className="text-center text-gray-500 text-lg mt-8"
      >
        No tasks found. Start by adding a new one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))}
    </div>
  );
};

export default TaskList;
