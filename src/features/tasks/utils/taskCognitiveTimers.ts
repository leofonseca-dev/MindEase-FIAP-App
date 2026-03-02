const KEY = 'mindease.task.doingStartedAt.v1';

type DoingMap = Record<string, string>; 

export const loadDoingMap = (): DoingMap => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
};

export const saveDoingMap = (map: DoingMap) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(map));
};

export const markDoingStarted = (taskId: string, at = new Date()) => {
  const map = loadDoingMap();
  map[taskId] = at.toISOString();
  saveDoingMap(map);
};

export const clearDoingStarted = (taskId: string) => {
  const map = loadDoingMap();
  delete map[taskId];
  saveDoingMap(map);
};