import { Row, Col, Card, Statistic } from "antd";
import { EnvironmentOutlined, RocketOutlined } from "@ant-design/icons";

export default function CardsResumo({ resumo }) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic
            title="Solicitações Pendentes"
            value={resumo?.solicitacoesPendentes ?? 0}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic
            title="Minhas Areas"
            value={resumo?.areas ?? 0}
            prefix={<EnvironmentOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8}>
        <Card>
          <Statistic
            title="Historico"
            value={resumo?.historicoTotal ?? 0}
            prefix={<RocketOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
}
