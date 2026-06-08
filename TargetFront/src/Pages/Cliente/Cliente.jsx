import { Row, Col, Typography, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/auth";
import { getResumo } from "../../services/cliente.service";
import CardsResumo from "./Components/CardsResumo";
import MinhasPropriedades from "./Components/MinhasPropriedades";
import ProximasOperacoes from "./Components/ProximasOperacoes";
import HistoricoOperacoes from "./Components/HistoricoOperacoes";
import HistoricoOrcamentos from "./Components/Grid/HistoricoOrcamentos";
import GridSolicitacoes from "./Components/Grid/GridSolicitacoes";

const { Title, Paragraph } = Typography;

export default function Cliente() {
  const [resumo, setResumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarResumo() {
      try {
        setLoading(true);
        const data = await getResumo();
        setResumo(data);
      } catch {
        setResumo(null);
      } finally {
        setLoading(false);
      }
    }
    carregarResumo();
  }, [refreshKey]);

  function logout() {
    removeToken();
    navigate("/login");
  }

  function atualizarDados() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <Spin spinning={loading}>
      <div className="cliente-page">
        <div className="cliente-page-header">
          <Title level={2} style={{ margin: 0 }}>
            Área do Cliente
          </Title>
          <Button danger onClick={logout}>
            Logout
          </Button>
        </div>

        <Title level={3} className="cliente-welcome-title">
          Bem-vindo à sua Área de Cliente
          {resumo?.nomeCliente ? `, ${resumo.nomeCliente}` : ""}!
        </Title>

        <Paragraph>
          Gerencie suas propriedades, acompanhe solicitações e visualize mapas e
          relatórios.
        </Paragraph>

        <CardsResumo resumo={resumo} />

        <Row gutter={24} style={{ marginTop: 30 }}>
          <Col span={24}>
            <GridSolicitacoes onUpdated={atualizarDados} />
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 30 }}>
          <Col span={24}>
            <MinhasPropriedades onUpdated={atualizarDados} />
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: 30 }}>
          <Col span={24}>
            <HistoricoOperacoes />
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: 30 }}>
          <Col xs={24} lg={16}>
            <HistoricoOrcamentos />
          </Col>
          <Col xs={24} lg={8}>
            <ProximasOperacoes />
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
