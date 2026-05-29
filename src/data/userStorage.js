import { STORAGE_KEY } from '../types/user';
import { STORAGE_KEY as PRIORITIES_KEY } from '../types/priority';

/**
 * Data layer for user operations.
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

function saveToStorage(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsers() {
  return loadFromStorage();
}

export function addUser(name) {
  const users = loadFromStorage();
  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
  };
  users.push(newUser);
  saveToStorage(users);
  return newUser;
}

export function deleteUser(id) {
  const users = loadFromStorage();
  const filtered = users.filter((u) => u.id !== id);
  saveToStorage(filtered);
}

/**
 * Ensure at least one user exists. If none, create a "Default" user
 * and assign all existing priorities to it.
 */
export function ensureDefaultUser() {
  const users = loadFromStorage();
  if (users.length > 0) return users[0].id;

  const defaultUser = addUser('Default');

  try {
    const raw = localStorage.getItem(PRIORITIES_KEY);
    if (raw) {
      const priorities = JSON.parse(raw);
      priorities.forEach((p) => {
        if (!p.userId) p.userId = defaultUser.id;
      });
      localStorage.setItem(PRIORITIES_KEY, JSON.stringify(priorities));
    }
  } catch {
    // ignore migration errors
  }

  return defaultUser.id;
}
