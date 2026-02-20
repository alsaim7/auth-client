export const TOKEN_KEY = "access_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) =>
    localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () =>
    localStorage.removeItem(TOKEN_KEY);

export const isAuthenticated = () =>
    Boolean(getToken());

export function decodeToken(token) {
    if (!token) return null;

    try {
        const payloadBase64 = token.split(".")[1];
        return JSON.parse(atob(payloadBase64));
    } catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
}