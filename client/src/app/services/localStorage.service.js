const TOKEN_KEY = "jwt-token";
const WALLET_KEY = "wallet-address";
const ATTACHED_WALLET_KEY = "attached-wallet-address";
const EMAIL_KEY = "email-address";
const THEME_KEY = "theme";
const THEME_BUTTON_KEY = "button_theme";

export function setToken(idToken) {
  localStorage.setItem(TOKEN_KEY, idToken);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setWallet(address) {
  localStorage.setItem(WALLET_KEY, address);
}

export function getWallet() {
  return localStorage.getItem(WALLET_KEY);
}

export function setEmailAddress(email) {
  localStorage.setItem(EMAIL_KEY, email);
}

export function getEmailAddress() {
  return localStorage.getItem(EMAIL_KEY);
}

export function setAttachedWalletAddress(address) {
  localStorage.setItem(ATTACHED_WALLET_KEY, address);
}

export function getAttachedWalletAddress() {
  return localStorage.getItem(ATTACHED_WALLET_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function removeWalletData() {
  localStorage.removeItem(WALLET_KEY);
  localStorage.removeItem(ATTACHED_WALLET_KEY);
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
  setEmailAddress,
  getEmailAddress,
  removeAuthData,
  setThemeToken,
  setThemeButtonToken,
  getThemeToken,
  getThemeButtonToken,
  setWallet,
  getWallet,
  setAttachedWalletAddress,
  getAttachedWalletAddress,
  removeWalletData,
};
export default localStorageService;
