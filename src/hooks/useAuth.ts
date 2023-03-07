import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "../components/PrivateRoute";

export function Rotas() {
    const { user, isFetching, isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="/"
                            element={<Navigate replace to={URL.DASHBOARD} />}
                        />
                        <Route path={URL.DASHBOARD} element={<Dashboard />} />
                        <Route
                            path={URL.AGENDAMENTO}
                            element={<Agendamentos />}
                        />
                        <Route path={URL.ATENDENTES} element={<Atendentes />} />
                        <Route path={URL.MEDICOS} element={<Medicos />} />
                        <Route path={URL.PACIENTES} element={<Pacientes />} />
                        <Route path={URL.DASHBOARD} element={<Dashboard />} />
                    </Route>
                </Route>
                <Route path={URL.LOGIN} element={<Entrar />} />
                <Route path={URL.CADASTRAR_PACIENTE} element={<CadastrarPaciente />} />
            </Routes>
        </BrowserRouter>
    );
}
