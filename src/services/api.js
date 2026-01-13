const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://phase-ii-backend-2.onrender.com";

// Helper to add Authorization header if token exists
const getAuthHeaders = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/* -------------------------
   AUTHENTICATION
------------------------- */

// Register a new user
export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to register. Check input fields.");
  }

  return data;
};

// Login user and get access token
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }).toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed. Check your credentials.");
  }

  return data; // { access_token, token_type, ... }
};

/* -------------------------
   TASKS
------------------------- */

// Get all tasks
export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(token) },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to fetch tasks.");
  }

  return response.json();
};

// Create a new task
export const createTask = async (token, title) => {
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(token) },
    body: JSON.stringify({ title }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to create task.");
  }

  return data;
};

// Update a task
export const updateTask = async (token, id, updates) => {
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(token) },
    body: JSON.stringify(updates),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update task.");
  }

  return data;
};

// Delete a task
export const deleteTask = async (token, id) => {
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(token) },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to delete task.");
  }

  return true;
};
