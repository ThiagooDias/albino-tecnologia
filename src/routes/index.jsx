import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login/Login";

// sidebar
import { SidebarFinanceiro } from "../components/SidebarFinanceiro/SidebarFinanceiro";
import { SidebarGp } from "../components/SidebarGp/SidebarGp";
import { SidebarGpp } from "../components/SidebarGpp/SidebarGpp";

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
import { DashboardGp } from "../pages/gp/dashboard/DashboardGp";
import { ProjetoGp } from "../pages/gp/projeto/Projeto";
import { Os } from "../pages/gp/os/Os";
import { DetalhesProjetoGp } from "../pages/gp/projeto/DetalhesProjeto/DetalhesProjetoGp";
import { CadastrarOs } from "../pages/gp/os/CadastrarOs/CadastrarOs";
import { VerOs } from "../pages/gp/os/VerOs/VerOs";
import { DetalhesOs } from "../pages/gp/os/DetalhesOs/DetalhesOs";
import { PrazosVencimento } from "../pages/financeiro/contrato/PrazosVencimento/PrazosVencimento";
import { DashboardGpp } from "../pages/gpp/dashboard/DashboardGpp";
import { ContratoGpp } from "../pages/gpp/contrato/ContratoGpp";
import { Projetos } from "../pages/gpp/projetos/Projetos";
import { DetalhesContratoGpp } from "../pages/gpp/contrato/DetalhesContratoGpp/DetalhesContratoGpp";
import { NovoProjeto } from "../pages/gpp/projetos/NovoProjeto/NovoProjeto";
import { VerProjetos } from "../pages/gpp/projetos/VerProjetos/VerProjetos";
import { DetalhesProjeto } from "../pages/gpp/projetos/DetalhesProjetos/DetalhesProjetos";

// diretor
import { SidebarDiretor } from "../components/SidebarDiretor/SidebarDiretor";
import { DashboardDiretor } from "../pages/diretor/dashboard/DashboardDiretor";
import { ClientesDiretor } from "../pages/diretor/clientes/ClientesDiretor";
import { FornecedoresDiretor } from "../pages/diretor/fornecedores/FornecedoresDiretor";
import { ContratosDiretor } from "../pages/diretor/contratos/ContratosDiretor";
import { OsDiretor } from "../pages/diretor/os/OsDiretor";
import { ProjetosDiretor } from "../pages/diretor/projetos/ProjetosDiretor";
import { DetalhesClienteDiretor } from "../pages/diretor/clientes/DetalhesCliente/DetalhesCliente";
import { DetalhesContratoDiretor } from "../pages/diretor/contratos/DetalhesContrato/DetalhesContrato";
import { DetalhesFornecedorDiretor } from "../pages/diretor/fornecedores/DetalhesFornecedorDiretor";
import { DetalhesOsDiretor } from "../pages/diretor/os/DetalhesOsDiretor";
import { DetalhesProjetoDiretor } from "../pages/diretor/projetos/DetalhesProjetoDiretor";

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas do admin */}
        <Route path="/admin" element={<Header />}>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/cadastrar-usuario"
            element={<CadastrarUsuarios />}
          />
          <Route path="/admin/usuarios" element={<VerUsuario />} />
          <Route path="/admin/usuarios/:id" element={<DetalhesUsuario />} />
        </Route>

        {/* rotas do financeiro */}
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
          <Route
            path="/financeiro/clientes/cadastrar-cliente"
            element={<CadastrarCliente />}
          />
          <Route
            path="/financeiro/clientes/lista-clientes"
            element={<VerClientes />}
          />
          <Route
            path="/financeiro/clientes/lista-clientes/:id"
            element={<DetalhesCliente />}
          />

          <Route path="/financeiro/fornecedores" element={<Fornecedores />} />
          <Route
            path="/financeiro/fornecedores/cadastrar-fornecedor"
            element={<CadastrarFornecedor />}
          />
          <Route
            path="/financeiro/fornecedores/lista-fornecedores"
            element={<VerFornecedores />}
          />
          <Route
            path="/financeiro/fornecedores/lista-fornecedores/:id"
            element={<DetalhesFornecedor />}
          />

          <Route path="/financeiro/contrato" element={<ContratoFinanceiro />} />
          <Route
            path="/financeiro/contrato/cadastrar-contrato"
            element={<CadastrarContrato />}
          />
          <Route
            path="/financeiro/contrato/lista-contratos"
            element={<VerContrato />}
          />
          <Route
            path="/financeiro/contrato/lista-contratos/:id"
            element={<DetalhesContrato />}
          />
          <Route
            path="/financeiro/contrato/prazo-vencimento"
            element={<PrazosVencimento />}
          />
          <Route
            path="/financeiro/contrato/prazo-vencimento/:id"
            element={<DetalhesContrato />}
          />
        </Route>

        {/* rotas do gp */}
        <Route path="/gp" element={<SidebarGp />}>
          <Route
            path={"/gp"}
            element={<Navigate to={"/gp/dashboard"} replace />}
          />
          <Route path="/gp/dashboard" element={<DashboardGp />} />

          <Route path="/gp/projeto" element={<ProjetoGp />} />
          <Route path="/gp/projeto/:id" element={<DetalhesProjetoGp />} />

          <Route path="/gp/os" element={<Os />} />
          <Route path="/gp/os/cadastrar-os" element={<CadastrarOs />} />
          <Route path="/gp/os/painel/" element={<VerOs />} />
          <Route path="/gp/os/painel/detalhes/:id" element={<DetalhesOs />} />
        </Route>

        {/* rotas do gpp */}
        <Route path="/gpp" element={<SidebarGpp />}>
          <Route
            path={"/gpp"}
            element={<Navigate to={"/gpp/dashboard"} replace />}
          />

          <Route path="/gpp/dashboard" element={<DashboardGpp />} />
          <Route path="/gpp/contrato" element={<ContratoGpp />} />
          <Route path="/gpp/contrato/:id" element={<DetalhesContratoGpp />} />

          <Route path="/gpp/projetos" element={<Projetos />} />
          <Route path="/gpp/projetos/novo-projeto" element={<NovoProjeto />} />
          <Route path="/gpp/projetos/ver-projetos" element={<VerProjetos />} />
          <Route
            path="/gpp/projetos/ver-projetos/:id"
            element={<DetalhesProjeto />}
          />
        </Route>

        {/* rotas do diretor */}
        <Route path="/diretor" element={<SidebarDiretor />}>
          <Route
            path={"/diretor"}
            element={<Navigate to={"/diretor/dashboard"} replace />}
          />
          <Route path="/diretor/dashboard" element={<DashboardDiretor />} />

          <Route path="/diretor/clientes" element={<ClientesDiretor />} />
          <Route
            path="/diretor/clientes/:id"
            element={<DetalhesClienteDiretor />}
          />

          <Route
            path="/diretor/fornecedores"
            element={<FornecedoresDiretor />}
          />
          <Route
            path="/diretor/fornecedores/:id"
            element={<DetalhesFornecedorDiretor />}
          />
          <Route path="/diretor/contrato" element={<ContratosDiretor />} />
          <Route
            path="/diretor/contrato/:id"
            element={<DetalhesContratoDiretor />}
          />

          <Route path="/diretor/os" element={<OsDiretor />} />
          <Route path="/diretor/os/detalhes/:id" element={<DetalhesOsDiretor />} />
          <Route path="/diretor/projetos" element={<ProjetosDiretor />} />
          <Route path="/diretor/projetos/:id" element={<DetalhesProjetoDiretor />} />
        </Route>
        {/* login */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
