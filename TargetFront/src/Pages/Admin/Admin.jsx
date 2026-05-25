import { Card, Col, Row, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import PageShell from "../../Components/PageShell";
import CardAdmin from "../../Components/Cards/CardAdmin";
import GridOrcamentos from "./Components/Grid/GridOrcamentos";
import GridUsuarios from "./Components/Usuarios/GridUsuarios";
import AdminDashboardGraficos from "./Components/AdminDashboardGraficos";
import CalendarioOrcamentos from "../../Components/Calendario/CalendarioPAdrao";
import { getDashboard } from "../../services/admin.service";

export default function Admin() {
  const [view, setView] = useState("dashboard");
  const [, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const carregarDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarDashboard();
  }, [carregarDashboard]);

  return (
    <PageShell title="Admin" subtitle="Visão geral do sistema.">
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <CardAdmin
            Titulo="Dashboard"
            onClick={() => setView("dashboard")}
            active={view === "dashboard"}
          />
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
            Titulo="Gerenciar Usuários"
            onClick={() => setView("usuarios")}
            active={view === "usuarios"}
          />

          <Col xs={24}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
              }}
            >
              {view === "dashboard" && <AdminDashboardGraficos />}
              {view === "todos" && (
                <GridOrcamentos modo="todos" onUpdated={carregarDashboard} />
              )}
              {view === "pendentes" && (
                <GridOrcamentos modo="pendentes" onUpdated={carregarDashboard} />
              )}
              {view === "agendados" && (
                <CalendarioOrcamentos useApi dragEnabled onUpdated={carregarDashboard} />
              )}
              {view === "usuarios" && <GridUsuarios />}
            </Card>
          </Col>
        </Row>
      </Spin>
    </PageShell>
  );
}
