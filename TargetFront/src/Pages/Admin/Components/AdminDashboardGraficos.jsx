import { Card, Col, Row, Spin } from "antd";
import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { getGraficos } from "../../../services/admin.service";

function GraficoPizza({ titulo, dados }) {
  const total = dados.reduce((s, d) => s + d.valor, 0);
  const config = {
    data: dados,
    angleField: "valor",
    colorField: "label",
    radius: 0.85,
    innerRadius: 0.5,
    label: {
      text: (d) => (d.valor > 0 ? `${d.label}: ${d.valor}` : ""),
      style: { fontSize: 10 },
    },
    legend: { position: "bottom" },
    statistic: {
      title: { content: titulo, style: { fontSize: 12 } },
      content: { content: `${total}`, style: { fontSize: 18 } },
    },
  };

  return (
    <Card title={titulo} size="small" style={{ height: "100%" }}>
      {total === 0 ? (
        <p style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>
          Sem dados no período
        </p>
      ) : (
        <Pie {...config} height={260} />
      )}
    </Card>
  );
}

export default function AdminDashboardGraficos() {
  const [graficos, setGraficos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const data = await getGraficos();
        setGraficos(data);
      } catch {
        setGraficos(null);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  if (loading) {
    return <Spin style={{ display: "block", margin: "40px auto" }} />;
  }

  if (!graficos) return null;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <GraficoPizza titulo="Pendentes — últimos 7 dias" dados={graficos.pendentesSemanal} />
      </Col>
      <Col xs={24} md={12}>
        <GraficoPizza titulo="Pendentes — mês atual" dados={graficos.pendentesMensal} />
      </Col>
      <Col xs={24} md={12}>
        <GraficoPizza titulo="Aprovados/Agendados — últimos 7 dias" dados={graficos.aprovadosSemanal} />
      </Col>
      <Col xs={24} md={12}>
        <GraficoPizza titulo="Aprovados/Agendados — mês atual" dados={graficos.aprovadosMensal} />
      </Col>
      <Col xs={24} md={12}>
        <GraficoPizza titulo="Rejeitados — últimos 7 dias" dados={graficos.rejeitadosSemanal} />
      </Col>
      <Col xs={24} md={12}>
        <GraficoPizza titulo="Rejeitados — mês atual" dados={graficos.rejeitadosMensal} />
      </Col>
    </Row>
  );
}
