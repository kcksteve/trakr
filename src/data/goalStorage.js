import { STORAGE_KEY } from '../types/goal';

/**
 * Data layer for goal operations.
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

function saveToStorage(goals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

export function getGoals() {
  return loadFromStorage();
}

export function addGoal(name) {
  const goals = loadFromStorage();
  const newGoal = {
    id: crypto.randomUUID(),
    name: name.trim(),
  };
  goals.push(newGoal);
  saveToStorage(goals);
  return newGoal;
}

export function deleteGoal(id) {
  const goals = loadFromStorage();
  const filtered = goals.filter((g) => g.id !== id);
  saveToStorage(filtered);
}
