const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export const getLocalStorage = (key: string): any => {
  const stored = localStorage.getItem(key) as string;

  return IsJsonString(stored) ? JSON.parse(stored) : stored;
};

export const setLocalStorage = (
  key: string,
  value: Record<string, any> | string | null
) => {
  const parsed = typeof value === "object" ? JSON.stringify(value) : value;
  localStorage.setItem(key, parsed);
};
