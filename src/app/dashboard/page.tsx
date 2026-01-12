"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { getTasks, createTask, updateTask, deleteTask } from "../../services/api";
import TaskList from "../../components/TaskList";
import TaskFilter from "../../components/TaskFilter";
import AddTaskForm from "../../components/AddTaskForm";
import useJsConfetti from "../../hooks/useJsConfetti";

interface Task {
  id: string;
  title: string;
  is_completed: boolean;
}

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, token } = useAuth();
  const router = useRouter();
  // const { fireConfetti } = useJsConfetti(); // Temporarily removed

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchTasks = async () => {
      if (!token) return;
      setLoadingTasks(true);
      setError(null);
      try {
        const fetchedTasks = await getTasks(token); // API call
        setTasks(fetchedTasks);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tasks.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated, router, token]);

  const getFilteredTasks = () => {
    if (currentFilter === "completed") {
      return tasks.filter((task) => task.is_completed);
    }
    if (currentFilter === "incomplete") {
      return tasks.filter((task) => !task.is_completed);
    }
    return tasks;
  };

  const handleAddTask = async (title: string) => {
    if (!token) return;
    setIsAddingTask(true);
    console.log("Attempting to add task with title:", title); // Debug log
    try {
      const newTask = await createTask(token, title); // API call
      setTasks((prevTasks) => [...prevTasks, newTask]);
      console.log("Task added successfully:", newTask); // Debug log
    } catch (err: any) {
      setError(err.message || "Failed to add task.");
      console.error("Error adding task:", err); // Debug log
    } finally {
      setIsAddingTask(false);
    }
  };

  const handleEditTask = async (taskId: string, newTitle: string) => {
    if (!token) return;
    console.log("Attempting to edit task ID:", taskId, "with new title:", newTitle); // Debug log
    try {
      const updatedTask = await updateTask(token, taskId, { title: newTitle }); // API call
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      console.log("Task edited successfully:", updatedTask); // Debug log
    } catch (err: any) {
      setError(err.message || "Failed to edit task.");
      console.error("Error editing task:", err); // Debug log
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!token) return;
    console.log("Attempting to delete task ID:", taskId); // Debug log
    try {
      await deleteTask(token, taskId); // API call
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      console.log("Task deleted successfully, ID:", taskId); // Debug log
    } catch (err: any) {
      setError(err.message || "Failed to delete task.");
      console.error("Error deleting task:", err); // Debug log
    }
  };

  const handleToggleTaskStatus = async (taskId: string) => {
    if (!token) return;
    const taskToToggle = tasks.find((task) => task.id === taskId);
    if (!taskToToggle) return;

    const newIsCompleted = !taskToToggle.is_completed;
    console.log("Attempting to toggle task ID:", taskId, "to is_completed:", newIsCompleted); // Debug log
    try {
      const updatedTask = await updateTask(token, taskId, { is_completed: newIsCompleted }); // API call
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      console.log("Task status toggled successfully:", updatedTask); // Debug log

      if (updatedTask.is_completed) {
        // fireConfetti(); // Temporarily removed
      }
    } catch (err: any) {
      setError(err.message || "Failed to update task status.");
      console.error("Error toggling task status:", err); // Debug log
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (loadingTasks) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground p-8">
      <div className="container mx-auto">
        <h1
          className="text-4xl font-bold mb-6 text-white"
        >
          Hello, {user?.email || "User"}!
        </h1>

        {/* Task Counts */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gray-800 p-6 rounded-xl shadow-custom-dark text-center">
            <p className="text-gray-400 text-lg">Total Tasks</p>
            <p className="text-primary-400 text-3xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-custom-dark text-center">
            <p className="text-gray-400 text-lg">Completed</p>
            <p className="text-green-400 text-3xl font-bold">{completedTasks}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-custom-dark text-center">
            <p className="text-gray-400 text-lg">Pending</p>
            <p className="text-red-400 text-3xl font-bold">{pendingTasks}</p>
          </div>
        </div>

        {/* Motivational Quote (Optional) */}
        <div
          className="bg-primary-800 p-4 rounded-xl shadow-md text-white text-center italic mb-8"
        >
          "The best way to get started is to quit talking and begin doing." - Walt Disney
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Your Tasks</h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <TaskFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
          <AddTaskForm onAddTask={handleAddTask} isLoading={isAddingTask} />
        </div>

        <TaskList
          tasks={getFilteredTasks()}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleStatus={handleToggleTaskStatus}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
