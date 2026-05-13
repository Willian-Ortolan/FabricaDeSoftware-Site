import { Card, Table, Button, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalNovaSolicitacao from "../Modal/ModalNovaSolicitacao";

export default function GridSolicitacoes() {
  const [open, setOpen] = useState(false);

  const data = [
    {
      key: 1,
      propriedade: "Fazenda Primavera",
      servico: "Pulverização",
      data: "10/06/2025",
      status: "Pendente",
    },
  ];

  const columns = [
    {
      title: "Propriedade",
      dataIndex: "propriedade",
    },
    {
      title: "Serviço",
      dataIndex: "servico",
    },
    {
      title: "Data",
      dataIndex: "data",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Ações",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} />
          <Button danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const salvarSolicitacao = (values) => {
    console.log("Nova solicitação:", values);
    setOpen(false);
  };

  return (
    <>
      <Card
        title="Solicitações"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Nova Solicitação
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} pagination={false} />
      </Card>

      <ModalNovaSolicitacao
        open={open}
        onClose={() => setOpen(false)}
        onSave={salvarSolicitacao}
      />
    </>
  );
}
