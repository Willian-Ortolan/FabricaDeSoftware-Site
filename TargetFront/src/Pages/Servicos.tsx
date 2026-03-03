import { Button, Card, Col, Row, Tag, Typography } from "antd";
import PageShell from "../Components/PageShell";

const { Paragraph, Title } = Typography;

const services = [
  {
    title: "Mapeamento Aéreo",
    tag: "NDVI • Ortofoto • Relatórios",
    description:
      "Diagnóstico completo da área produtiva com imagens de alta resolução e índices de vegetação.",
  },
  {
    title: "Pulverização de Precisão",
    tag: "Aplicação dirigida",
    description:
      "Aplicação eficiente e segura, reduzindo desperdícios e minimizando impacto ambiental.",
  },
  {
    title: "Monitoramento Agrícola",
    tag: "Insights em tempo real",
    description:
      "Acompanhamento constante da lavoura para decisões rápidas e assertivas.",
  },
];

export default function Servicos() {
  return (
    <PageShell
      title="Serviços"
      subtitle="Soluções completas com drones para aumentar produtividade e reduzir custos."
      actions={
        <Button
          type="primary"
          style={{
            borderRadius: 999,
            background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
            border: "none",
            fontWeight: 600,
            paddingInline: 18,
          }}
        >
          Solicitar Orçamento
        </Button>
      }
    >
      <Row gutter={[24, 24]}>
        {services.map((s) => (
          <Col key={s.title} xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
                height: "100%",
              }}
            >
              <Tag color="#e0ecff" style={{ color: "#1d4ed8", borderRadius: 999 }}>
                {s.tag}
              </Tag>
              <Title level={4} style={{ marginTop: 12, marginBottom: 8 }}>
                {s.title}
              </Title>
              <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                {s.description}
              </Paragraph>
              <Button style={{ borderRadius: 999 }}>Ver detalhes</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </PageShell>
  );
}

