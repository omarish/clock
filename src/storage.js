class Storage {
  get = (key, defaultValue) => {
    return localStorage.getItem(key) || defaultValue
  }

  set = (key, val) => {
    localStorage.setItem(key, val)
  }
}

export default Storage
