import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login/Login";

// sidebar
import { SidebarFinanceiro } from "../components/SidebarFinanceiro/SidebarFinanceiro";
import { SidebarGp } from "../components/SidebarGp/SidebarGp";

// importando as paginas do financeiro
import { Clientes } from "../pages/financeiro/clientes/Clientes";
import { ContratoFinanceiro } from "../pages/financeiro/contrato/ContratoFinanceiro";
import { DashboardFinanceiro } from "../pages/financeiro/dashboard";
import { Fornecedores } from "../pages/financeiro/fornecedores/Fornecedores";
import { CadastrarCliente } from "../pages/financeiro/clientes/CadastrarCliente/CadastrarCliente";
import { DetalhesCliente } from "../pages/financeiro/clientes/DetalhesCliente/DetalhesCliente";
import { VerClientes } from "../pages/financeiro/clientes/VerClientes/VerClientes";
import { VerFornecedores } from "../pages/financeiro/fornecedores/VerFornecedores/VerFornecedores";
import { CadastrarFornecedor } from "../pages/financeiro/fornecedores/CadastrarFornecedor/CadastrarFornecedor";
import { DetalhesFornecedor } from "../pages/financeiro/fornecedores/DetalhesFornecedor/DetalhesFornecedor";
import { CadastrarContrato } from "../pages/financeiro/contrato/CadastrarContrato/CadastrarContrato";
import { DetalhesContrato } from "../pages/financeiro/contrato/DetalhesContrato/DetalhesContrato";
import { VerContrato } from "../pages/financeiro/contrato/VerContrato/VerContrato";

// importando as paginas do admin
import { Admin } from "../pages/admin/Admin";
import { Header } from "../components/Header/Header";
import { CadastrarUsuarios } from "../pages/admin/CadastarUsuarios/CadastrarUsuarios";
import { VerUsuario } from "../pages/admin/VerUsuarios/VerUsuario";
import { DetalhesUsuario } from "../pages/admin/DetalhesUsuario/DetalhesUsuario";

// importando as paginas do gp
import { DashboardGp } from "../pages/gp/dashboard";
import { ContratoGp } from "../pages/gp/contrato/Contrato";
import { Os } from "../pages/gp/os/Os";
import { DetalhesContratoGp } from "../pages/gp/contrato/DetalhesContrato/DetalhesContratoGp";
import { CadastrarOs } from "../pages/gp/os/CadastrarOs/CadastrarOs";
import { VerOs } from "../pages/gp/os/VerOs/VerOs";
import { DetalhesOs } from "../pages/gp/os/DetalhesOs/DetalhesOs";

// teste

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        // rotas do admin
        <Route path="/admin" element={<Header />}>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/cadastrar-usuario"
            element={<CadastrarUsuarios />}
          />
          <Route path="/admin/usuarios" element={<VerUsuario />} />
          <Route path="/admin/usuarios/:id" element={<DetalhesUsuario />} />
        </Route>

        // rotas do financeiro
        <Route path="/financeiro" element={<SidebarFinanceiro />}>
          <Route
            path={"/financeiro"}
            element={<Navigate to={"/financeiro/dashboard"} replace />}
          />
          <Route
            path="/financeiro/dashboard"
            element={<DashboardFinanceiro />}
          />

          <Route path="/financeiro/clientes" element={<Clientes />} />
          <Route path="/financeiro/clientes/cadastrar-cliente" element={<CadastrarCliente />} />
          <Route path="/financeiro/clientes/lista-clientes" element={<VerClientes />} />
          <Route path="/financeiro/clientes/lista-clientes/:id" element={<DetalhesCliente/>} />
          
          <Route path="/financeiro/fornecedores" element={<Fornecedores />} />
          <Route path="/financeiro/fornecedores/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
          <Route path="/financeiro/fornecedores/lista-fornecedores" element={<VerFornecedores />} />
          <Route path="/financeiro/fornecedores/lista-fornecedores/:id" element={<DetalhesFornecedor />} />

          <Route path="/financeiro/contrato" element={<ContratoFinanceiro />} />
          <Route path="/financeiro/contrato/cadastrar-contrato" element={<CadastrarContrato />} />
          <Route path="/financeiro/contrato/lista-contratos" element={<VerContrato />} />
          <Route path="/financeiro/contrato/lista-contratos/:id" element={<DetalhesContrato />} />
        </Route>

        // rotas do gp
        <Route path="/gp" element={<SidebarGp />}>
          <Route
            path={"/gp"}
            element={<Navigate to={"/gp/dashboard"} replace />}
          />
          <Route path="/gp/dashboard" element={<DashboardGp />} />

          <Route path="/gp/contrato" element={<ContratoGp />} />
          <Route path="/gp/contrato/:id" element={<DetalhesContratoGp/>} />

          <Route path="/gp/os" element={<Os />} />
          <Route path="/gp/os/cadastrar-os" element={<CadastrarOs />} />
          <Route path="/gp/os/lista" element={<VerOs />} />
          <Route path="/gp/os/lista/detalhes/:id" element={<DetalhesOs />} />
        </Route>

        //login
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
