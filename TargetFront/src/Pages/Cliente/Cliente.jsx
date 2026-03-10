import { Row, Col, Typography } from "antd";
import { useState } from "react";

import CardsResumo from "./Components/CardsResumo";
import MinhasPropriedades from "./Components/MinhasPropriedades";
import ProximasOperacoes from "./Components/ProximasOperacoes";
import HistoricoOperacoes from "./Components/HistoricoOperacoes";
import HistoricoOrcamentos from "./Components/Grid/HistoricoOrcamentos";
import GridSolicitacoes from "./Components/Grid/GridSolicitacoes";

const { Title, Paragraph } = Typography;

export default function ClienteDashboard() {
  const [mostrarSolicitacoes, setMostrarSolicitacoes] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Bem-vindo à sua Área de Cliente, João Silva!</Title>

      <Paragraph>
        Gerencie suas propriedades, acompanhe solicitações e visualize mapas e
        relatórios.
      </Paragraph>

      {/* cards superiores */}
      <CardsResumo onClickSolicitacoes={() => setMostrarSolicitacoes(true)} />

      {/* card de solicitações */}
      {mostrarSolicitacoes && (
        <Row gutter={24} style={{ marginTop: 30 }}>
          <Col span={24}>
            <GridSolicitacoes />
          </Col>
        </Row>
      )}

      <Row gutter={24} style={{ marginTop: 30 }}>
        <Col span={24}>
          <MinhasPropriedades />
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 30 }}>
        <Col span={24}>
          <HistoricoOperacoes />
        </Col>
      </Row>

      <Row gutter={24} style={{ marginTop: 30 }}>
        <Col span={16}>
          <HistoricoOrcamentos />
        </Col>

        <Col span={8}>
          <ProximasOperacoes />
        </Col>
      </Row>
    </div>
  );
}
