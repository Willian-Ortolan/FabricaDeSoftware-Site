import { Card, Row, Col } from "antd";
import { Area } from "@ant-design/plots";

const dataPulverizacao = [
  { mes: "Jan", valor: 2 },
  { mes: "Fev", valor: 5 },
  { mes: "Mar", valor: 8 },
  { mes: "Abr", valor: 6 },
  { mes: "Mai", valor: 10 },
];

const dataSolidos = [
  { mes: "Jan", valor: 1 },
  { mes: "Fev", valor: 2 },
  { mes: "Mar", valor: 3 },
  { mes: "Abr", valor: 4 },
  { mes: "Mai", valor: 6 },
];

const dataMapeamento = [
  { mes: "Jan", valor: 2 },
  { mes: "Fev", valor: 4 },
  { mes: "Mar", valor: 6 },
  { mes: "Abr", valor: 5 },
  { mes: "Mai", valor: 3 },
];
export default function HistoricoOperacoes() {
  const configPulverizacao = {
    data: dataPulverizacao,
    xField: "mes",
    yField: "valor",
    smooth: true,
    height: 300,

    color: "#1677ff",

    style: {
      fill: "linear-gradient(-90deg, rgba(22,119,255,0.05) 0%, rgba(22,119,255,0.45) 100%)",
    },

    line: {
      style: {
        lineWidth: 3,
      },
    },

    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: "#fff",
        stroke: "#1677ff",
        lineWidth: 2,
      },
    },
  };

  const configSolidos = {
    data: dataSolidos,
    xField: "mes",
    yField: "valor",
    smooth: true,
    height: 300,

    color: "#52c41a",

    style: {
      fill: "linear-gradient(-90deg, rgba(82,196,26,0.05) 0%, rgba(82,196,26,0.45) 100%)",
    },

    line: {
      style: {
        lineWidth: 3,
        stroke: "#52c41a",
      },
    },

    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: "#fff",
        stroke: "#52c41a",
        lineWidth: 2,
      },
    },
  };

  const configMapeamento = {
    data: dataMapeamento,
    xField: "mes",
    yField: "valor",
    smooth: true,
    height: 300,

    color: "#dd1111",

    style: {
      fill: "linear-gradient(-90deg, rgba(221, 20, 20, 0.05) 0%, rgba(221,20,20,0.45) 100%)",
    },

    line: {
      style: {
        lineWidth: 3,
        stroke: "#dd1111",
      },
    },

    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: "#fff",
        stroke: "#dd1111",
        lineWidth: 2,
      },
    },
  };

  return (
    <Card title="Histórico de Operações">
      <Row gutter={24}>
        <Col span={8}>
          <Card size="small" title="Pulverização">
            <Area {...configPulverizacao} />
          </Card>
        </Col>

        <Col span={8}>
          <Card size="small" title="Sólidos">
            <Area {...configSolidos} />
          </Card>
        </Col>

        <Col span={8}>
          <Card size="small" title="Mapeamentos">
            <Area {...configMapeamento} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
