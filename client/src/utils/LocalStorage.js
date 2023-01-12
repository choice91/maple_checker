export const setLocalStorage = (name, value) => {
  return localStorage.setItem(name, value);
};

export const getLocalStorage = (name) => {
  return localStorage.getItem(name);
};

export const removeLocalStorage = (name) => {
  return localStorage.removeItem(name);
};
