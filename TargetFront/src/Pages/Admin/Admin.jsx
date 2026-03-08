import { Button, Card, Col, Row } from "antd";
import PageShell from "../../Components/PageShell";
import CardAdmin from "../../Components/Cards/CardAdmin";
import GridAprovacao from "./Components/Grid/GridAprovacao";
import CalendarioOrcamentos from "../../Components/Calendario/CalendarioPAdrao";
import { OrcamentosCalendario } from "../../Mock/OrcamentosCalendario";
import { useState } from "react";

export default function Admin() {
  const [view, setView] = useState("dashboard");
  return (
    <>
      <PageShell
        title="Admin"
        subtitle="Visão geral do sistema."
        actions={
          <Button style={{ borderRadius: 999, fontWeight: 600 }}>
            Novo cadastro
          </Button>
        }
      >
        <Row gutter={[24, 24]}>
          <CardAdmin
            Titulo="Dashboard"
            onClick={() => setView("Dashboard")}
            active={view === "Dashboard"}
          />
          <CardAdmin
            Titulo="Orçamentos Pendentes"
            Value={45}
            onClick={() => setView("Pendentes")}
            active={view === "Pendentes"}
          />
          <CardAdmin
            Titulo="Orçamentos Agendados"
            Value={12}
            onClick={() => setView("Agendados")}
            active={view === "Agendados"}
          />
          {/* <CardAdmin Titulo="Clientes" value={31} /> */}

          <Col xs={24}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
              }}
            >
              {/* <GridAprovacao /> GErid de orçamentos para aprovação */}
              {view === "Dashboard" && <GridAprovacao />}
              {view === "Pendentes" && <GridAprovacao Status="Pendente" />}
              {view === "Agendados" && (
                <CalendarioOrcamentos orcamentos={OrcamentosCalendario} />
              )}
            </Card>
          </Col>
        </Row>
      </PageShell>
    </>
  );
}
