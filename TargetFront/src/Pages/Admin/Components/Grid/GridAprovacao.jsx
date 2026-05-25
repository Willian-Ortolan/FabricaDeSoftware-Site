import { Tag, Button, Space, Modal, InputNumber, DatePicker, message, Spin } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";
import {
  getOrcamentos,
  aprovarOrcamento,
  rejeitarOrcamento,
  ajustarOrcamento,
  reagendarOrcamento,
} from "../../../../services/admin.service";

const columns = (handlers) => [
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
  },
  {
    title: "Ações",
    key: "acoes",
    render: (_, record) => (
      <Space wrap>
        {record.Status === "Pendente" && (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handlers.aprovar(record)}
          >
            Aprovar
          </Button>
        )}
        {record.Status === "Pendente" && (
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handlers.rejeitar(record)}
          >
            Rejeitar
          </Button>
        )}
        <Button
          icon={<EditOutlined />}
          onClick={() => handlers.ajustar(record)}
        >
          Ajustar
        </Button>
        {record.Status === "Aprovado" && (
          <Button
            icon={<CalendarOutlined />}
            onClick={() => handlers.reagendar(record)}
          >
            Reagendar
          </Button>
        )}
      </Space>
    ),
  },
];

export default function GridAprovacao({ Status, onUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ajusteModal, setAjusteModal] = useState(null);
  const [reagendarModal, setReagendarModal] = useState(null);
  const [novoValor, setNovoValor] = useState(null);
  const [novaData, setNovaData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getOrcamentos(Status);
      setData(result);
    } catch (error) {
      message.error(
        error.response?.data?.mensagem || "Erro ao carregar orçamentos.",
      );
    } finally {
      setLoading(false);
    }
  }, [Status]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function executarAcao(acao, mensagemSucesso) {
    try {
      setActionLoading(true);
      await acao();
      message.success(mensagemSucesso);
      await carregar();
      onUpdated?.();
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao executar ação.");
    } finally {
      setActionLoading(false);
    }
  }

  const handlers = {
    aprovar: (record) =>
      executarAcao(
        () => aprovarOrcamento(record.IdOrcamento),
        "Orçamento aprovado com sucesso.",
      ),
    rejeitar: (record) =>
      executarAcao(
        () => rejeitarOrcamento(record.IdOrcamento),
        "Orçamento rejeitado.",
      ),
    ajustar: (record) => {
      setNovoValor(record.VlrEstimado);
      setAjusteModal(record);
    },
    reagendar: (record) => {
      setNovaData(dayjs());
      setReagendarModal(record);
    },
  };

  async function confirmarAjuste() {
    if (!ajusteModal || novoValor == null) return;
    await executarAcao(
      () => ajustarOrcamento(ajusteModal.IdOrcamento, novoValor),
      "Valor ajustado com sucesso.",
    );
    setAjusteModal(null);
  }

  async function confirmarReagendamento() {
    if (!reagendarModal || !novaData) return;
    await executarAcao(
      () =>
        reagendarOrcamento(
          reagendarModal.IdOrcamento,
          novaData.toISOString(),
        ),
      "Orçamento reagendado com sucesso.",
    );
    setReagendarModal(null);
  }

  return (
    <>
      <Spin spinning={loading}>
        <GridPadrao
          columns={columns(handlers)}
          data={data}
          rowKey="IdOrcamento"
          loading={actionLoading}
        />
      </Spin>

      <Modal
        title="Ajustar valor estimado"
        open={!!ajusteModal}
        onCancel={() => setAjusteModal(null)}
        onOk={confirmarAjuste}
        confirmLoading={actionLoading}
        okText="Salvar"
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          value={novoValor}
          onChange={setNovoValor}
          formatter={(value) =>
            `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          }
          parser={(value) => value.replace(/R\$\s?|(\.*)/g, "").replace(",", ".")}
        />
      </Modal>

      <Modal
        title="Reagendar operação"
        open={!!reagendarModal}
        onCancel={() => setReagendarModal(null)}
        onOk={confirmarReagendamento}
        confirmLoading={actionLoading}
        okText="Reagendar"
      >
        <DatePicker
          style={{ width: "100%" }}
          value={novaData}
          onChange={setNovaData}
          format="DD/MM/YYYY"
        />
      </Modal>
    </>
  );
}
