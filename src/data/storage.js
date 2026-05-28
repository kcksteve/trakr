import { STORAGE_KEY } from '../types/priority';

/**
 * Data layer for priority operations.
 * All functions are abstracted so they can be swapped for API calls later.
 */

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(priorities) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(priorities));
}

export function getPriorities() {
  return loadFromStorage();
}

export function addPriority(priority) {
  const priorities = loadFromStorage();
  const newPriority = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...priority,
  };
  priorities.unshift(newPriority);
  saveToStorage(priorities);
  return newPriority;
}

export function updatePriority(id, updates) {
  const priorities = loadFromStorage();
  const index = priorities.findIndex((p) => p.id === id);
  if (index === -1) return null;

  priorities[index] = { ...priorities[index], ...updates };
  saveToStorage(priorities);
  return priorities[index];
}

export function deletePriority(id) {
  const priorities = loadFromStorage();
  const filtered = priorities.filter((p) => p.id !== id);
  saveToStorage(filtered);
}

export function movePriority(id, newStatus) {
  return updatePriority(id, { status: newStatus });
}
