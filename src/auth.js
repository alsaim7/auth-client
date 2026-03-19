import jwtDecode from "jwt-decode";

export const TOKEN_KEY = "access_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) =>
    localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () =>
    localStorage.removeItem(TOKEN_KEY);

export const isAuthenticated = () =>
    Boolean(getToken());

export const getUser = () => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (err) {
        console.error("Invalid token:", err);
        return null;
    }
};