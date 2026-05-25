import { Card, Row, Col, Spin } from "antd";
import { Area } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { getHistoricoOperacoes } from "../../../services/cliente.service";

const tipos = [
  { key: "pulverizacao", titulo: "Pulverização", color: "#1677ff", stroke: "#1677ff" },
  { key: "solidos", titulo: "Sólidos", color: "#52c41a", stroke: "#52c41a" },
  { key: "mapeamento", titulo: "Mapeamentos", color: "#dd1111", stroke: "#dd1111" },
];

function buildConfig(data, color, stroke) {
  return {
    data,
    xField: "mes",
    yField: "valor",
    smooth: true,
    height: 300,
    color,
    style: {
      fill: `linear-gradient(-90deg, ${color}0d 0%, ${color}73 100%)`,
    },
    line: { style: { lineWidth: 3, stroke } },
    point: {
      size: 4,
      shape: "circle",
      style: { fill: "#fff", stroke, lineWidth: 2 },
    },
  };
}

export default function HistoricoOperacoes() {
  const [dados, setDados] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const resultados = await Promise.all(
          tipos.map(async (t) => {
            const data = await getHistoricoOperacoes(t.key);
            return [t.key, data];
          }),
        );
        setDados(Object.fromEntries(resultados));
      } catch {
        setDados({});
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  return (
    <Spin spinning={loading}>
      <Card title="Histórico de Operações">
        <Row gutter={24}>
          {tipos.map((t) => (
            <Col span={8} key={t.key}>
              <Card size="small" title={t.titulo}>
                <Area {...buildConfig(dados[t.key] || [], t.color, t.stroke)} />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Spin>
  );
}
