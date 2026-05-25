import { Row, Col, Card, Statistic } from "antd";
import { EnvironmentOutlined, RocketOutlined } from "@ant-design/icons";

export default function CardsResumo({ resumo, onClickSolicitacoes }) {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card
          hoverable
          onClick={onClickSolicitacoes}
          style={{ cursor: "pointer" }}
        >
          <Statistic
            title="Solicitações Pendentes"
            value={resumo?.solicitacoesPendentes ?? 0}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Minhas Areas"
            value={resumo?.areas ?? 0}
            prefix={<EnvironmentOutlined />}
          />
        </Card>
      </Col>

      <Col span={6}>
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
