// Favorite tools persisted in localStorage, exposed as an external store for
// useSyncExternalStore. The server snapshot is always empty, so the first
// client render matches the prerendered HTML and saved favorites appear right
// after hydration (no hydration mismatch).

const STORAGE_KEY = "favorite-tools";
const CHANGE_EVENT = "favorite-tools-change";

export function subscribeFavorites(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Snapshots are raw strings so they stay referentially stable between reads.
export function getFavoritesSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export function getFavoritesServerSnapshot() {
  return "[]";
}

export function parseFavorites(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);

    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Storage may be unavailable (e.g. private mode).
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}
