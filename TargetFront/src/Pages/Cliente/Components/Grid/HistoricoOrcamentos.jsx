import { Card, Table, Tag, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getHistoricoOrcamentos } from "../../../../services/cliente.service";

const columns = [
  { title: "Data", dataIndex: "data", key: "data" },
  { title: "Propriedade", dataIndex: "propriedade", key: "propriedade" },
  { title: "Serviço", dataIndex: "servico", key: "servico" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color = "default";
      if (status === "Concluído") color = "green";
      if (status === "Agendado") color = "blue";
      if (status === "Pendente") color = "orange";
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

export default function HistoricoOrcamentos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getHistoricoOrcamentos();
      setData(result);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <Spin spinning={loading}>
      <Card title="Evolução das Operações">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </Spin>
  );
}
