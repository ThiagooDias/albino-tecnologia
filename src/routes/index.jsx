import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login/Login";

// sidebar 
import { SidebarFinanceiro } from "../components/SidebarFinanceiro/SidebarFinanceiro";
import { SidebarGp } from "../components/SidebarGp/SidebarGp";

// importando as paginas do financeiro
import { Clientes } from "../pages/financeiro/clientes";
import { ContratoFinanceiro } from "../pages/financeiro/contrato";
import { DashboardFinanceiro } from "../pages/financeiro/dashboard";
import { Fornecedores } from "../pages/financeiro/fornecedores";
import { BotaoContainer } from "../components/ContainerBotoes/BotaoContainer";

// importando as paginas do admin
import { Admin } from "../pages/admin/Admin";
import { Header } from "../components/Header/Header"
import { CadastrarUsuarios } from "../pages/admin/CadastarUsuarios/CadastrarUsuarios";

// importando as paginas do gp
import { DashboardGp } from "../pages/gp/dashboard";
import { ContratoGp } from "../pages/gp/contrato";
import { Os } from "../pages/gp/os";


// teste

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        
        // rotas do admin
        <Route path="/admin" element={<Header />} >
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/cadastrar-usuario" element={<CadastrarUsuarios />} />
        </Route>

        // rotas do financeiro
        <Route path="/financeiro" element={<SidebarFinanceiro/>}>
          <Route path={'/financeiro'} element={<Navigate to={'/financeiro/dashboard'} replace /> }/>
          <Route path="/financeiro/dashboard" element={<DashboardFinanceiro />} />
          <Route path="/financeiro/contrato" element={<ContratoFinanceiro />} />
          <Route path="/financeiro/clientes" element={<Clientes />} />
          <Route path="/financeiro/fornecedores" element={<Fornecedores />} />
        </Route>

        // rotas do gp
        <Route path="/gp" element={<SidebarGp/>}>
          <Route path={'/gp'} element={<Navigate to={'/gp/dashboard'} replace /> }/>
          <Route path="/gp/dashboard" element={<DashboardGp />} />
          <Route path="/gp/contrato" element={<ContratoGp />} />
          <Route path="/gp/os" element={<Os />} />
        </Route>

        //login
        <Route path="/" element={<LoginPage />}/>

      </Routes>
    </BrowserRouter>
  );
}
