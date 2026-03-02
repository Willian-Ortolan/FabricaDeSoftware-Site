import { Card, Row, Col } from "antd";
import HeroSection from "../Components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div style={{ padding: 40 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Mapeamento Aéreo">
              Imagens NDVI e relatórios completos.
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Pulverização de Precisão">
              Aplicação eficiente e segura.
            </Card>
          </Col>

          <Col span={8}>
            <Card title="Monitoramento Agrícola">
              Análises precisas da lavoura.
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
