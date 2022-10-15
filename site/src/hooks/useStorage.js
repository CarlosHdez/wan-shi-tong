
export const useStorage = (key) => {
  if (!window.localStorage || !window.localStorage.setItem || !window.localStorage.removeItem) {
    console.warn('LocalStorage not supported, values will not be saved')
    return {
      value: null,
      setItem: () => {},
      removeItem: () => {}
    }
  }

  const value = localStorage[key]
  return {
    storage: window.localStorage,
    value: value ? JSON.parse(value) : null
  }
}
