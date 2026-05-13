import { Button, Card, Col, Descriptions, Form, Input, Row, Select, Typography } from "antd";
import PageShell from "../Components/PageShell";

const { Paragraph, Title } = Typography;

export default function Mapeamento() {
  return (
    <PageShell
      title="Mapeamento"
      subtitle="Gere mapas e relatórios para acompanhar vigor, falhas e variabilidade da lavoura."
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
          Solicitar Mapeamento
        </Button>
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={14}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
              height: "100%",
            }}
          >
            <Title level={4} style={{ marginBottom: 8 }}>
              O que você recebe
            </Title>
            <Paragraph type="secondary">
              Entregáveis ajustados ao seu objetivo (diagnóstico, planejamento ou acompanhamento).
            </Paragraph>

            <Descriptions
              column={1}
              size="middle"
              items={[
                { key: "1", label: "Ortomosaico", children: "Imagem georreferenciada em alta resolução." },
                { key: "2", label: "NDVI / Índices", children: "Mapas de vigor e variabilidade da vegetação." },
                { key: "3", label: "Relatório", children: "Insights práticos e recomendações por talhão." },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} md={10}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Simule um orçamento
            </Title>

            <Form layout="vertical">
              <Form.Item label="Cultura" name="cultura">
                <Select
                  placeholder="Selecione"
                  options={[
                    { value: "soja", label: "Soja" },
                    { value: "milho", label: "Milho" },
                    { value: "cafe", label: "Café" },
                    { value: "cana", label: "Cana-de-açúcar" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Área (ha)" name="area">
                <Input placeholder="Ex.: 120" />
              </Form.Item>
              <Form.Item label="Cidade/UF" name="local">
                <Input placeholder="Ex.: Uberlândia/MG" />
              </Form.Item>
              <Button type="primary" block style={{ borderRadius: 12, fontWeight: 600 }}>
                Enviar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
}

