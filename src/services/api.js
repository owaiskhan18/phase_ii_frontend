const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://phase-ii-backend-1.onrender.com";

const getAuthHeaders = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authentication Endpoints
export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to register. Please check your credentials.");
  }

  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: email, password }).toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed. Check your credentials.");
  }

  return data;
};

// Task Endpoints
export const getTasks = async (token) => {
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: "GET",
    headers: { ...getAuthHeaders(token) },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

export const createTask = async (token, title) => {
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(token) },
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to create task");
  }
  return data;
};

export const updateTask = async (token, id, updates) => {
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders(token) },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Failed to update task");
  }
  return data;
};

export const deleteTask = async (token, id) => {
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders(token) },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Failed to delete task");
  }
  return true;
};
