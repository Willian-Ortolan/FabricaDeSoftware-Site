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

const statusTag = (status) => {
  const map = {
    Pendente: "orange",
    AguardandoCliente: "gold",
    Agendado: "green",
    Aprovado: "blue",
    Rejeitado: "red",
    "Concluído": "default",
  };
  const label =
    status === "AguardandoCliente" ? "Aguard. Cliente" : status;
  return <Tag color={map[status] || "default"}>{label}</Tag>;
};

function renderAcoes(record, handlers, modo) {
  const s = record.Status;

  if (s === "Rejeitado" || s === "Concluído") return null;

  if (modo === "pendentes" || (modo === "todos" && s === "Pendente")) {
    return (
      <Space wrap>
        <Button type="primary" icon={<CheckOutlined />} onClick={() => handlers.aprovar(record)}>
          Aprovar
        </Button>
        <Button danger icon={<CloseOutlined />} onClick={() => handlers.rejeitar(record)}>
          Rejeitar
        </Button>
        <Button icon={<EditOutlined />} onClick={() => handlers.ajustar(record)}>
          Ajustar
        </Button>
      </Space>
    );
  }

  if (modo === "todos" && s === "Agendado") {
    return (
      <Button icon={<CalendarOutlined />} onClick={() => handlers.reagendar(record)}>
        Reagendar
      </Button>
    );
  }

  if (modo === "todos" && s === "AguardandoCliente") {
    return (
      <Button icon={<EditOutlined />} onClick={() => handlers.ajustar(record)}>
        Ajustar
      </Button>
    );
  }

  return null;
}

/**
 * @param {"todos"|"pendentes"} modo
 */
export default function GridOrcamentos({ modo = "todos", onUpdated }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ajusteModal, setAjusteModal] = useState(null);
  const [reagendarModal, setReagendarModal] = useState(null);
  const [novoValor, setNovoValor] = useState(null);
  const [novaData, setNovaData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const statusFiltro = modo === "pendentes" ? "Pendente" : undefined;

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getOrcamentos(statusFiltro);
      setData(modo === "pendentes" ? result : result);
    } catch (error) {
      message.error(error.response?.data?.mensagem || "Erro ao carregar orçamentos.");
    } finally {
      setLoading(false);
    }
  }, [statusFiltro, modo]);

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
    aprovar: (r) =>
      executarAcao(() => aprovarOrcamento(r.IdOrcamento), "Enviado para aprovação do cliente."),
    rejeitar: (r) =>
      executarAcao(() => rejeitarOrcamento(r.IdOrcamento), "Orçamento rejeitado."),
    ajustar: (r) => {
      setNovoValor(r.VlrEstimado);
      setNovaData(
        r.DataAgendada ? dayjs(r.DataAgendada) : dayjs(r.DataSolicitada),
      );
      setAjusteModal(r);
    },
    reagendar: (r) => {
      setNovaData(r.DataAgendada ? dayjs(r.DataAgendada) : dayjs());
      setReagendarModal(r);
    },
  };

  const columns = [
    { title: "Nº", dataIndex: "IdOrcamento" },
    { title: "Cliente", dataIndex: "Cliente" },
    {
      title: "Situação",
      dataIndex: "Status",
      render: (s) => statusTag(s),
    },
    {
      title: "Valor",
      dataIndex: "VlrEstimado",
      render: (v) =>
        v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    },
    { title: "Data solic.", dataIndex: "DataSolicitada" },
    { title: "Data agend.", dataIndex: "DataAgendada", render: (d) => d || "—" },
    {
      title: "Ações",
      render: (_, record) => renderAcoes(record, handlers, modo),
    },
  ];

  async function confirmarAjuste() {
    if (!ajusteModal) return;
    const payload = {};
    if (novoValor != null) payload.VlrEstimado = novoValor;
    if (novaData) payload.DataAgendada = novaData.toISOString();
    await executarAcao(
      () => ajustarOrcamento(ajusteModal.IdOrcamento, payload),
      "Orçamento ajustado. Aguardando aprovação do cliente.",
    );
    setAjusteModal(null);
  }

  async function confirmarReagendamento() {
    if (!reagendarModal || !novaData) return;
    await executarAcao(
      () => reagendarOrcamento(reagendarModal.IdOrcamento, novaData.toISOString()),
      "Data alterada. Cliente deve confirmar novamente.",
    );
    setReagendarModal(null);
  }

  return (
    <>
      <Spin spinning={loading}>
        <GridPadrao
          columns={columns}
          data={data}
          rowKey="IdOrcamento"
          loading={actionLoading}
        />
      </Spin>

      <Modal
        title="Ajustar orçamento"
        open={!!ajusteModal}
        onCancel={() => setAjusteModal(null)}
        onOk={confirmarAjuste}
        confirmLoading={actionLoading}
        okText="Salvar"
      >
        <p style={{ color: "#64748b", marginBottom: 16 }}>
          Alterações de valor ou data exigem nova aprovação do cliente.
        </p>
        <div style={{ marginBottom: 12 }}>
          <label>Valor estimado</label>
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            value={novoValor}
            onChange={setNovoValor}
          />
        </div>
        <div>
          <label>Data da operação</label>
          <DatePicker
            style={{ width: "100%" }}
            value={novaData}
            onChange={setNovaData}
            format="DD/MM/YYYY"
          />
        </div>
      </Modal>

      <Modal
        title="Reagendar operação"
        open={!!reagendarModal}
        onCancel={() => setReagendarModal(null)}
        onOk={confirmarReagendamento}
        confirmLoading={actionLoading}
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
