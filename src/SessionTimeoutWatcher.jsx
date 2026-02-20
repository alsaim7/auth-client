import { useEffect, useRef } from "react";
import { clearToken, getToken } from "./auth";
import { useNavigate } from "react-router-dom";

function parseJwtExp(token) {
    try {
        const [, payload] = token.split(".");
        const json = JSON.parse(
            atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        return typeof json.exp === "number" ? json.exp : null;
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

            const expSec = parseJwtExp(token);

            if (!expSec) {
                clearToken();
                navigate("/login", { replace: true });
                return;
            }

            const remaining = expSec * 1000 - Date.now();

            if (remaining <= 0) {
                clearToken();
                navigate("/login", { replace: true });
                return;
            }

            timerRef.current = setTimeout(() => {
                clearToken();
                navigate("/login", { replace: true });
            }, remaining);
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