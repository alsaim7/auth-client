import axios from "axios";
import { getToken } from "./auth";

let API = null;

export function createAPI(config) {
    API = axios.create({
        baseURL: config.baseURL,
        headers: {
            "Content-Type": "application/json",
            ...(config.apiKey && { "x-api-key": config.apiKey }),
        },
    });

    API.interceptors.request.use((req) => {
        const token = getToken();
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    });

    return API;
}

export function getAPI() {
    if (!API) {
        throw new Error("API not initialized. Call createAPI() first.");
    }
    return API;
}