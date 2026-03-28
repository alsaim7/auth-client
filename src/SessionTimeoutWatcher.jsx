import { useEffect, useRef } from "react";
import { clearToken, getToken } from "./auth";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function getTokenExpiry(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded?.exp ?? null;
    } catch {
        return null;
    }
}

export default function SessionTimeoutWatcher() {
    const navigate = useNavigate();
    const timerRef = useRef(null);

    useEffect(() => {
        function schedule() {
            if (timerRef.current) clearTimeout(timerRef.current);

            const token = getToken();
            if (!token) return;

            const expSec = getTokenExpiry(token);

            if (!expSec) {
                handleLogout();
                return;
            }

            const remaining = expSec * 1000 - Date.now();

            if (remaining <= 0) {
                handleLogout();
                return;
            }

            timerRef.current = setTimeout(handleLogout, remaining);
        }

        function handleLogout() {
            clearToken();
            navigate("/login", { replace: true });
        }

        schedule();

        const onVisibility = () => {
            if (document.visibilityState === "visible") schedule();
        };

        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [navigate]);

    return null;
}
