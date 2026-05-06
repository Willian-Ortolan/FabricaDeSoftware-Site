import { Row, Col, Card, Statistic } from "antd";
import {
  EnvironmentOutlined,
  FileTextOutlined,
  RocketOutlined,
  PictureOutlined,
} from "@ant-design/icons";

export default function CardsResumo({ onClickSolicitacoes }) {
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card
          hoverable
          onClick={onClickSolicitacoes}
          style={{ cursor: "pointer" }}
        >
          <Statistic title="Solicitações Pendentes" value={4} />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Minhas Areas"
            value={3}
            prefix={<EnvironmentOutlined />}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic title="Historico" value={15} prefix={<RocketOutlined />} />
        </Card>
      </Col>

      {/*<Col span={6}>
         <Card>
          <Statistic
            title="Mapas Disponíveis"
            value={7}
            prefix={<PictureOutlined />}
          />
        </Card> 
      </Col>*/}
    </Row>
  );
}
