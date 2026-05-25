import { Card, Tag, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getProximasOperacoes } from "../../../services/cliente.service";
import PrevisaoClima from "../../../Components/Clima/PrevisaoClima";

export default function ProximasOperacoes() {
  const [operacoes, setOperacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProximasOperacoes();
      setOperacoes(data);
    } catch {
      setOperacoes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <Spin spinning={loading}>
      <Card title="Próximas Operações Agendadas">
        {operacoes.length === 0 && (
          <p style={{ color: "#64748b" }}>Nenhuma operação agendada.</p>
        )}
        {operacoes.map((op, index) => (
          <div
            key={`${op.propriedade}-${op.data}-${index}`}
            style={{
              marginBottom: index < operacoes.length - 1 ? 20 : 0,
              paddingBottom: index < operacoes.length - 1 ? 16 : 0,
              borderBottom:
                index < operacoes.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <b>{op.propriedade}</b>
            <div>{op.dataHora}</div>
            {op.cidade && (
              <div style={{ fontSize: 12, color: "#64748b" }}>{op.cidade}</div>
            )}
            <Tag color="blue" style={{ marginTop: 6 }}>
              {op.status}
            </Tag>
            <PrevisaoClima cidade={op.cidade} data={op.data} compact />
          </div>
        ))}
      </Card>
    </Spin>
  );
}
