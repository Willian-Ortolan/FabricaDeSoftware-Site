import { Card, Table, Button, Space, Spin, message, Popconfirm, Alert } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import ModalNovaSolicitacao from "../Modal/ModalNovaSolicitacao";
import {
  getSolicitacoes,
  criarSolicitacao,
  atualizarSolicitacao,
  excluirSolicitacao,
  aprovarSolicitacaoCliente,
} from "../../../../services/cliente.service";
import { mapSolicitacaoPayload } from "../../../../utils/solicitacao";

export default function GridSolicitacoes({ onUpdated }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getSolicitacoes();
      setData(result);
    } catch (error) {
      message.error(
        error.response?.data?.mensagem || "Erro ao carregar solicitações.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const columns = [
    { title: "Propriedade", dataIndex: "propriedade" },
    { title: "Serviço", dataIndex: "servico" },
    { title: "Data", dataIndex: "data" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Ações",
      render: (_, record) => (
        <Space wrap direction="vertical" size="small">
          {record.observacaoCliente && (
            <Alert
              type="warning"
              showIcon
              message={record.observacaoCliente}
              style={{ marginBottom: 4, fontSize: 12 }}
            />
          )}
          <Space>
            {record.podeAprovar && (
              <Button
                type="primary"
                size="small"
                icon={<CheckOutlined />}
                onClick={() => handleAprovar(record.key)}
              >
                Aprovar alteração
              </Button>
            )}
            {record.podeEditar && (
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditando(record);
                  setOpen(true);
                }}
              />
            )}
            {record.podeExcluir && (
              <Popconfirm
                title="Excluir solicitação?"
                onConfirm={() => handleExcluir(record.key)}
              >
                <Button size="small" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            )}
          </Space>
        </Space>
      ),
    },
  ];

  async function handleAprovar(id) {
    try {
      await aprovarSolicitacaoCliente(id);
      message.success("Orçamento confirmado! Operação agendada.");
      await carregar();
      onUpdated?.();
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao aprovar.");
    }
  }

  async function salvarSolicitacao(values) {
    try {
      const payload = mapSolicitacaoPayload(values);
      if (editando) {
        await atualizarSolicitacao(editando.key, payload);
        message.success("Solicitação atualizada!");
      } else {
        await criarSolicitacao(payload);
        message.success("Solicitação enviada!");
      }
      setOpen(false);
      setEditando(null);
      await carregar();
      onUpdated?.();
    } catch (error) {
      message.error(
        error.response?.data?.mensagem || "Erro ao salvar solicitação.",
      );
    }
  }

  async function handleExcluir(id) {
    try {
      await excluirSolicitacao(id);
      message.success("Solicitação excluída.");
      await carregar();
      onUpdated?.();
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao excluir.");
    }
  }

  return (
    <>
      <Spin spinning={loading}>
        <Card
          title="Solicitações"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditando(null);
                setOpen(true);
              }}
            >
              Nova Solicitação
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="key"
          />
        </Card>
      </Spin>

      <ModalNovaSolicitacao
        open={open}
        onClose={() => {
          setOpen(false);
          setEditando(null);
        }}
        onSave={salvarSolicitacao}
        initialData={editando}
      />
    </>
  );
}
