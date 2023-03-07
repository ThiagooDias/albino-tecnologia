import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NotFound() {
    const { user} = useAuth();
    return (
        <div>
            {user == null && <Navigate to="/" replace={true} />}
            <h2 className="text-red-700 font-bold text-6xl">
                Página não encontrada
            </h2>
        </div>
    );
}
