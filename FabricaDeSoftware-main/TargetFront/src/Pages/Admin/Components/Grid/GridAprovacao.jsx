import { Tag, Button, Space } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";

const columns = [
  {
    title: "Nº Orçamento",
    dataIndex: "IdOrcamento",
    key: "IdOrcamento",
  },
  {
    title: "Cliente",
    dataIndex: "Cliente",
    key: "Cliente",
  },
  {
    title: "Situação",
    dataIndex: "Status",
    key: "Status",

    filters: [
      { text: "Pendente", value: "Pendente" },
      { text: "Aprovado", value: "Aprovado" },
      { text: "Rejeitado", value: "Rejeitado" },
    ],

    onFilter: (value, record) => record.Status === value,

    render: (status) => {
      let color = "default";

      if (status === "Pendente") color = "orange";
      if (status === "Aprovado") color = "green";
      if (status === "Rejeitado") color = "red";

      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Valor Estimado",
    dataIndex: "VlrEstimado",
    key: "VlrEstimado",
    render: (value) =>
      value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    title: "Data Solicitada",
    dataIndex: "DataSolicitada",
    key: "DataSolicitada",
    render: (data) => new Date(data).toLocaleDateString("pt-BR"),
  },
  {
    title: "Ações",
    key: "acoes",
    render: (_, record) => (
      <Space wrap>
        {/* Aprovar */}
        {record.Status === "Pendente" && (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => console.log("Aprovar", record)}
          >
            Aprovar
          </Button>
        )}

        {/* Rejeitar */}
        {record.Status === "Pendente" && (
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => console.log("Rejeitar", record)}
          >
            Rejeitar
          </Button>
        )}

        {/* Ajustar orçamento */}
        <Button
          icon={<EditOutlined />}
          onClick={() => console.log("Ajustar orçamento", record)}
        >
          Ajustar
        </Button>

        {/* Reagendar apenas se aprovado */}
        {record.Status === "Aprovado" && (
          <Button
            icon={<CalendarOutlined />}
            onClick={() => console.log("Reagendar", record)}
          >
            Reagendar
          </Button>
        )}
      </Space>
    ),
  },
];

const data = [
  {
    IdOrcamento: 1,
    Cliente: "João",
    Status: "Pendente",
    VlrEstimado: 2545,
    DataSolicitada: "2026-03-05",
  },
  {
    IdOrcamento: 2,
    Cliente: "Maria",
    Status: "Aprovado",
    VlrEstimado: 1345,
    DataSolicitada: "2026-03-06",
  },
  {
    IdOrcamento: 3,
    Cliente: "Pedro",
    Status: "Pendente",
    VlrEstimado: 3504,
    DataSolicitada: "2026-03-07",
  },
  {
    IdOrcamento: 4,
    Cliente: "Ana",
    Status: "Rejeitado",
    VlrEstimado: 5745,
    DataSolicitada: "2026-03-08",
  },
];

export default function Aprovacoes({ Status }) {
  const dataFiltrada = Status
    ? data.filter((item) => item.Status === Status)
    : data;

  return (
    <GridPadrao columns={columns} data={dataFiltrada} rowKey="IdOrcamento" />
  );
}
