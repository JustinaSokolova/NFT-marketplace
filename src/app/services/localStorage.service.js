const TOKEN_KEY = "jwt-token";
const THEME_KEY = "theme";
const THEME_BUTTON_KEY = "button_theme";

export function setToken(idToken) {
  localStorage.setItem(TOKEN_KEY, idToken);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setThemeToken(idToken) {
  localStorage.setItem(THEME_KEY, idToken);
}

export function setThemeButtonToken(idToken) {
  localStorage.setItem(THEME_BUTTON_KEY, idToken);
}

export function getThemeToken() {
  return localStorage.getItem(THEME_KEY);
}

export function getThemeButtonToken() {
  return localStorage.getItem(THEME_BUTTON_KEY);
}

const localStorageService = {
  setToken,
  getAccessToken,
  removeAuthData,
  setThemeToken,
  setThemeButtonToken,
  getThemeToken,
  getThemeButtonToken,
};
export default localStorageService;
