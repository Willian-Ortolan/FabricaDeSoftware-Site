import { Button, Card, Col, Descriptions, Form, Input, Row, Select, Typography } from "antd";
import PageShell from "../Components/PageShell";

const { Paragraph, Title } = Typography;

export default function Pulverizacao() {
  return (
    <PageShell
      title="Pulverização"
      subtitle="Aplicação eficiente, segura e com menor impacto ambiental."
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
          Solicitar Pulverização
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
              Diferenciais
            </Title>
            <Paragraph type="secondary">
              Operação planejada para reduzir deriva, desperdício e exposição humana.
            </Paragraph>

            <Descriptions
              column={1}
              size="middle"
              items={[
                { key: "1", label: "Economia", children: "Redução no consumo de água e defensivos." },
                { key: "2", label: "Segurança", children: "Menor contato humano com produtos químicos." },
                { key: "3", label: "Performance", children: "Cobertura rápida com aplicação uniforme." },
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
              Solicitar atendimento
            </Title>

            <Form layout="vertical">
              <Form.Item label="Tipo de aplicação" name="tipo">
                <Select
                  placeholder="Selecione"
                  options={[
                    { value: "fungicida", label: "Fungicida" },
                    { value: "herbicida", label: "Herbicida" },
                    { value: "inseticida", label: "Inseticida" },
                    { value: "fertilizante", label: "Fertilizante foliar" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Área (ha)" name="area">
                <Input placeholder="Ex.: 80" />
              </Form.Item>
              <Form.Item label="Cidade/UF" name="local">
                <Input placeholder="Ex.: Rio Verde/GO" />
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

