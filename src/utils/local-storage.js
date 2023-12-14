export const accessToken = {
  key: "accessToken",
  get() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(this.key);
  },
  set(value) {
    localStorage.setItem(this.key, value);
  },
  delete() {
    localStorage.removeItem(this.key);
  },
};

export const localStorageUtil = {
  accessToken,
};
