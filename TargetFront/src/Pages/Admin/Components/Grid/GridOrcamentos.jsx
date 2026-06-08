import {

  Tag,

  Button,

  Space,

  Modal,

  InputNumber,

  DatePicker,

  message,

  Spin,

} from "antd";

import {

  CheckOutlined,

  CloseOutlined,

  EditOutlined,

  CalendarOutlined,

  EyeOutlined,

  CheckCircleOutlined,

  DollarOutlined,

} from "@ant-design/icons";

import { useCallback, useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";

import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";
import BarraFiltrosGrid from "../../../../Components/GridPadrao/BarraFiltrosGrid";
import {
  filtrarOrcamentos,
  STATUS_ORCAMENTO_OPCOES,
} from "../../../../utils/filtroGrid";

import ModalFinanceiroOrcamento from "../Financeiro/ModalFinanceiroOrcamento";

import ModalVisualizarOrcamento from "../ModalVisualizarOrcamento";

import {

  STATUS_PAGAMENTO_COLOR,

  STATUS_PAGAMENTO_LABEL,

} from "../../../../services/financeiro.service";

import {

  desabilitarDatasPassadas,

  propsInputMoeda,

  validarDataManual,

  validarMoedaManual,

} from "../../../../utils/validacao";

import {

  getOrcamentos,

  aprovarOrcamento,

  rejeitarOrcamento,

  ajustarOrcamento,

  reagendarOrcamento,

  marcarOrcamentoAtendido,

} from "../../../../services/admin.service";



const statusTag = (status) => {

  const map = {

    Pendente: "orange",

    AguardandoCliente: "gold",

    Agendado: "green",

    Aprovado: "blue",

    Rejeitado: "red",

    RespondidoAoCliente: "cyan",

    "Concluído": "default",

  };

  const labels = {

    AguardandoCliente: "Aguard. Cliente",

    RespondidoAoCliente: "Respondido ao cliente",

  };

  const label = labels[status] || status;

  return <Tag color={map[status] || "default"}>{label}</Tag>;

};



function renderAcoes(record, handlers, modo) {

  const s = record.Status;



  if (s === "Rejeitado" || s === "Concluído") return null;



  if (record.ClienteNovo && s === "Pendente") {

    return (

      <Button

        type="primary"

        icon={<CheckCircleOutlined />}

        onClick={() => handlers.atendido(record)}

      >

        Atendido

      </Button>

    );

  }



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



function pagamentoTag(record) {

  if (record.Status === "Rejeitado") {

    return <Tag color="red">Cancelado</Tag>;

  }

  if (!record.StatusPagamento) {

    return <Tag>Sem registro</Tag>;

  }

  return (

    <Tag color={STATUS_PAGAMENTO_COLOR[record.StatusPagamento] || "default"}>

      {STATUS_PAGAMENTO_LABEL[record.StatusPagamento] || record.StatusPagamento}

    </Tag>

  );

}



function renderAcoesFinanceiro(record, onFinanceiro) {

  if (record.Status === "Rejeitado") return null;

  return (

    <Button icon={<DollarOutlined />} onClick={() => onFinanceiro(record)}>

      Financeiro

    </Button>

  );

}



/**

 * @param {"todos"|"pendentes"} modo

 */

export default function GridOrcamentos({ modo = "todos", onUpdated }) {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [ajusteModal, setAjusteModal] = useState(null);

  const [reagendarModal, setReagendarModal] = useState(null);

  const [visualizarModal, setVisualizarModal] = useState(null);

  const [financeiroModal, setFinanceiroModal] = useState(null);

  const [novoValor, setNovoValor] = useState(null);

  const [novaData, setNovaData] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [buscaCliente, setBuscaCliente] = useState("");
  const [buscaPropriedade, setBuscaPropriedade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const statusFiltro = modo === "pendentes" ? "Pendente" : undefined;



  const carregar = useCallback(async () => {

    try {

      setLoading(true);

      const result = await getOrcamentos(statusFiltro);

      setData(result);

    } catch (error) {

      message.error(error.response?.data?.mensagem || "Erro ao carregar orçamentos.");

    } finally {

      setLoading(false);

    }

  }, [statusFiltro]);



  useEffect(() => {

    carregar();

  }, [carregar]);

  const dataFiltrada = useMemo(
    () =>
      filtrarOrcamentos(data, {
        cliente: buscaCliente,
        propriedade: buscaPropriedade,
        status: filtroStatus,
      }),
    [data, buscaCliente, buscaPropriedade, filtroStatus],
  );

  function limparFiltros() {
    setBuscaCliente("");
    setBuscaPropriedade("");
    setFiltroStatus("");
  }

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

    atendido: (r) =>

      executarAcao(

        () => marcarOrcamentoAtendido(r.IdOrcamento),

        "Orçamento marcado como respondido ao cliente.",

      ),

  };



  const columns = [

    { title: "Nº", dataIndex: "IdOrcamento" },

    {

      title: "Cliente",

      dataIndex: "Cliente",

      render: (nome, record) => (

        <Space direction="vertical" size={0}>

          <Space>

            <span>{nome}</span>

            {record.ClienteNovo && <Tag color="purple">Novo</Tag>}

          </Space>

          {record.Fazenda && (

            <span style={{ fontSize: 12, color: "#64748b" }}>{record.Fazenda}</span>

          )}

        </Space>

      ),

    },

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

    {

      title: "Pagamento",

      render: (_, record) => pagamentoTag(record),

    },

    { title: "Data solic.", dataIndex: "DataSolicitada" },

    { title: "Data agend.", dataIndex: "DataAgendada", render: (d) => d || "—" },

    {

      title: "Ações",

      render: (_, record) => (

        <Space wrap>

          <Button icon={<EyeOutlined />} onClick={() => setVisualizarModal(record)}>

            Visualizar

          </Button>

          {renderAcoes(record, handlers, modo)}

          {renderAcoesFinanceiro(record, setFinanceiroModal)}

        </Space>

      ),

    },

  ];



  async function confirmarAjuste() {

    if (!ajusteModal) return;

    const payload = {};

    try {

      if (novoValor != null && novoValor !== ajusteModal.VlrEstimado) {

        validarMoedaManual(novoValor, "Valor estimado");

        payload.VlrEstimado = novoValor;

      }

      if (novaData) {

        validarDataManual(novaData, "Data da operação");

        payload.DataAgendada = novaData.toISOString();

      }

      if (!payload.VlrEstimado && !payload.DataAgendada) {

        message.error("Informe valor ou data para ajuste");

        return;

      }

    } catch (error) {

      message.error(error.message);

      return;

    }

    await executarAcao(

      () => ajustarOrcamento(ajusteModal.IdOrcamento, payload),

      "Orçamento ajustado. Aguardando aprovação do cliente.",

    );

    setAjusteModal(null);

  }



  async function confirmarReagendamento() {

    if (!reagendarModal || !novaData) return;

    try {

      validarDataManual(novaData, "Data da operação");

    } catch (error) {

      message.error(error.message);

      return;

    }

    await executarAcao(

      () => reagendarOrcamento(reagendarModal.IdOrcamento, novaData.toISOString()),

      "Data alterada. Cliente deve confirmar novamente.",

    );

    setReagendarModal(null);

  }



  const visualizar = visualizarModal;



  return (

    <>

      <Spin spinning={loading}>
        <BarraFiltrosGrid
          cliente={buscaCliente}
          onClienteChange={setBuscaCliente}
          propriedade={buscaPropriedade}
          onPropriedadeChange={setBuscaPropriedade}
          status={filtroStatus}
          onStatusChange={setFiltroStatus}
          statusOptions={modo === "pendentes" ? undefined : STATUS_ORCAMENTO_OPCOES}
          statusPlaceholder="Situação do orçamento"
          onLimpar={limparFiltros}
        />

        <GridPadrao
          columns={columns}
          data={dataFiltrada}
          rowKey="IdOrcamento"
          loading={actionLoading}
        />
      </Spin>



      <ModalVisualizarOrcamento

        orcamento={visualizar}

        open={!!visualizar}

        onClose={() => setVisualizarModal(null)}

        footerExtra={

          visualizar?.Status === "Pendente" && visualizar?.ClienteNovo ? (

            <Button

              key="atendido"

              type="primary"

              loading={actionLoading}

              onClick={async () => {

                await handlers.atendido(visualizar);

                setVisualizarModal(null);

              }}

            >

              Atendido

            </Button>

          ) : null

        }

      />



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

            value={novoValor}

            onChange={setNovoValor}

            {...propsInputMoeda}

          />

        </div>

        <div>

          <label>Data da operação</label>

          <DatePicker

            style={{ width: "100%" }}

            value={novaData}

            onChange={setNovaData}

            format="DD/MM/YYYY"

            disabledDate={desabilitarDatasPassadas}

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

          disabledDate={desabilitarDatasPassadas}

        />

      </Modal>



      <ModalFinanceiroOrcamento

        idOrcamento={financeiroModal?.IdOrcamento}

        statusOrcamento={financeiroModal?.Status}

        open={!!financeiroModal}

        onClose={() => setFinanceiroModal(null)}

        onUpdated={carregar}

      />

    </>

  );

}


