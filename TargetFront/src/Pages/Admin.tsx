import { Button, Card, Col, Row, Statistic, Typography } from "antd";
import PageShell from "../Components/PageShell";

const { Paragraph } = Typography;

export default function Admin() {
  return (
    <PageShell
      title="Admin"
      subtitle="Visão geral do sistema (exemplo)."
      actions={
        <Button style={{ borderRadius: 999, fontWeight: 600 }}>Novo cadastro</Button>
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Statistic title="Solicitações (mês)" value={24} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Statistic title="Mapeamentos" value={12} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Statistic title="Pulverizações" value={8} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Statistic title="Clientes" value={31} />
          </Card>
        </Col>

        <Col xs={24}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 14px 40px rgba(15,23,42,0.06)",
            }}
          >
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Esta página é um esqueleto seguindo o layout do projeto. Você pode ligar estes cards
              a dados reais depois (API/banco).
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
}

