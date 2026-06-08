import { Card, Col, Row } from "antd";
import { useState } from "react";
import PageShell from "../../Components/PageShell";
import CardAdmin from "../../Components/Cards/CardAdmin";
import GridOrcamentos from "./Components/Grid/GridOrcamentos";
import GridUsuarios from "./Components/Usuarios/GridUsuarios";
import GridFinanceiro from "./Components/Financeiro/GridFinanceiro";
import CalendarioOrcamentos from "../../Components/Calendario/CalendarioPAdrao";
import TabMinhaEmpresa from "./Components/Empresa/TabMinhaEmpresa";
import TabPrecos from "./Components/Empresa/TabPrecos";
import { useEmpresaOptional } from "../../contexts/EmpresaContext";

export default function Admin() {
  const [view, setView] = useState("todos");
  const empresa = useEmpresaOptional();
  const titulo = empresa?.nome ? `Admin — ${empresa.nome}` : "Admin";

  return (
    <PageShell title={titulo} subtitle="Visão geral da empresa.">
      <Row gutter={[16, 16]}>
        <CardAdmin
          Titulo="Todos os Orçamentos"
          onClick={() => setView("todos")}
          active={view === "todos"}
        />
        <CardAdmin
          Titulo="Orçamentos Pendentes"
          onClick={() => setView("pendentes")}
          active={view === "pendentes"}
        />
        <CardAdmin
          Titulo="Orçamentos Agendados"
          onClick={() => setView("agendados")}
          active={view === "agendados"}
        />
        <CardAdmin
          Titulo="Financeiro"
          onClick={() => setView("financeiro")}
          active={view === "financeiro"}
        />
        <CardAdmin
          Titulo="Gerenciar Usuários"
          onClick={() => setView("usuarios")}
          active={view === "usuarios"}
        />
        <CardAdmin
          Titulo="Minha Empresa"
          onClick={() => setView("empresa")}
          active={view === "empresa"}
        />
        <CardAdmin
          Titulo="Preços"
          onClick={() => setView("precos")}
          active={view === "precos"}
        />

        <Col xs={24}>
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            {view === "todos" && <GridOrcamentos modo="todos" />}
            {view === "pendentes" && (
              <GridOrcamentos modo="pendentes" />
            )}
            {view === "agendados" && (
              <CalendarioOrcamentos useApi dragEnabled />
            )}
            {view === "financeiro" && <GridFinanceiro />}
            {view === "usuarios" && <GridUsuarios />}
            {view === "empresa" && <TabMinhaEmpresa />}
            {view === "precos" && <TabPrecos />}
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
}
