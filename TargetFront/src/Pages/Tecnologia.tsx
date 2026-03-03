import { Card, Col, Row, Typography } from "antd";
import PageShell from "../Components/PageShell";

const { Paragraph, Title } = Typography;

const items = [
  {
    title: "Planejamento Automatizado",
    description:
      "Rotas inteligentes, definição de área e parâmetros de operação com segurança e rastreabilidade.",
  },
  {
    title: "Precisão RTK",
    description:
      "Georreferenciamento com precisão centimétrica para mapas confiáveis e aplicação direcionada.",
  },
  {
    title: "Câmeras e Sensores",
    description:
      "Captura multiespectral e RGB para análises avançadas e detecção precoce de estresse.",
  },
  {
    title: "Relatórios Inteligentes",
    description:
      "Entregáveis objetivos para tomada de decisão: mapas, recomendações e histórico de operações.",
  },
];

export default function Tecnologia() {
  return (
    <PageShell
      title="Tecnologia"
      subtitle="Equipamentos e processos para entregar precisão, segurança e resultados."
    >
      <Row gutter={[24, 24]}>
        {items.map((it) => (
          <Col key={it.title} xs={24} md={12}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
                height: "100%",
              }}
            >
              <Title level={4} style={{ marginBottom: 8 }}>
                {it.title}
              </Title>
              <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                {it.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </PageShell>
  );
}

