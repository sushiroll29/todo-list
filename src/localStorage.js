function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn("Could not save to local storage.");
  }
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(`${key}`));
}


export {
  saveToLocalStorage,
  getFromLocalStorage,
};
