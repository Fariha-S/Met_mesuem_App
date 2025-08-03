import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function addToFavourites(id) {
  try {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function removeFromFavourites(id) {
  try {
    const res = await fetch(`${API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function getFavourites() {
  try {
    const res = await fetch(`${API_URL}/favourites`, {
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function addToHistory(id) {
  try {
    const res = await fetch(`${API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function removeFromHistory(id) {
  try {
    const res = await fetch(`${API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

async function getHistory() {
  try {
    const res = await fetch(`${API_URL}/history`, {
      headers: {
        Authorization: `JWT ${getToken()}`,
      },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToHistory,
  removeFromHistory,
  getHistory,
};
