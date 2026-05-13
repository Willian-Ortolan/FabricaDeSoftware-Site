import { Card, Table, Tag } from "antd";

const columns = [
  {
    title: "Data",
    dataIndex: "data",
    key: "data",
  },
  {
    title: "Propriedade",
    dataIndex: "propriedade",
    key: "propriedade",
  },
  {
    title: "Serviço",
    dataIndex: "servico",
    key: "servico",
  },
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

const data = [
  {
    id: 1,
    data: "26/04/2024",
    propriedade: "Fazenda Primavera",
    servico: "Pulverização",
    status: "Concluído",
  },
  {
    id: 2,
    data: "13/04/2024",
    propriedade: "Fazenda São Jorge",
    servico: "Mapeamento",
    status: "Concluído",
  },
  {
    id: 3,
    data: "16/04/2024",
    propriedade: "Fazenda São Jorge",
    servico: "Pulverização",
    status: "Concluído",
  },
];

export default function HistoricoOrcamentos() {
  return (
    <Card title="Evolução das Operações">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </Card>
  );
}
