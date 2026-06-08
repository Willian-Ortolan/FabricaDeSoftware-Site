import {
  Alert,
  Button,
  Card,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import BarraFiltrosGrid from "../../../../Components/GridPadrao/BarraFiltrosGrid";
import GridPadrao from "../../../../Components/GridPadrao/GridPadrao";
import ModalNovaSolicitacao from "../Modal/ModalNovaSolicitacao";
import {
  getSolicitacoes,
  criarSolicitacao,
  atualizarSolicitacao,
  excluirSolicitacao,
  aprovarSolicitacaoCliente,
} from "../../../../services/cliente.service";
import { mapSolicitacaoPayload } from "../../../../utils/solicitacao";
import { exibirTelefone } from "../../../../utils/validacao";
import {
  filtrarSolicitacoes,
  opcoesServicosSolicitacao,
  opcoesUnicas,
  parseDataBr,
} from "../../../../utils/filtroGrid";

const { Text } = Typography;

function formatMoeda(valor) {
  return Number(valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function renderStatus(status) {
  let color = "default";
  if (status === "Pendente") color = "orange";
  if (status === "Aguardando sua aprovação") color = "gold";
  if (status === "Agendado") color = "blue";
  if (status === "Concluído") color = "green";
  return <Tag color={color}>{status}</Tag>;
}

function renderServicosResumo(servicos) {
  if (!servicos?.length) return "—";
  return (
    <Space size={[4, 4]} wrap>
      {servicos.map((s, index) => (
        <Tag key={`${s.servico}-${s.dataExecucao}-${index}`}>{s.servico}</Tag>
      ))}
    </Space>
  );
}

const colunasServicosExpandido = [
  { title: "Serviço", dataIndex: "servico", key: "servico" },
  {
    title: "Área (ha)",
    dataIndex: "area",
    key: "area",
    render: (valor) => Number(valor).toLocaleString("pt-BR"),
  },
  { title: "Data execução", dataIndex: "dataExecucao", key: "dataExecucao" },
  {
    title: "R$/ha",
    dataIndex: "precoPorHa",
    key: "precoPorHa",
    render: formatMoeda,
  },
  {
    title: "Valor",
    dataIndex: "valor",
    key: "valor",
    render: formatMoeda,
  },
];

export default function GridSolicitacoes({ onUpdated }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [filtroPropriedade, setFiltroPropriedade] = useState("");
  const [filtroServico, setFiltroServico] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      setData(await getSolicitacoes());
    } catch (error) {
      message.error(
        error.response?.data?.mensagem || "Erro ao carregar solicitações.",
      );
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const opcoesPropriedade = useMemo(
    () => opcoesUnicas(data, "propriedade"),
    [data],
  );

  const opcoesServico = useMemo(
    () => opcoesServicosSolicitacao(data),
    [data],
  );

  const opcoesStatus = useMemo(() => opcoesUnicas(data, "status"), [data]);

  const dataFiltrada = useMemo(
    () =>
      filtrarSolicitacoes(data, {
        propriedade: filtroPropriedade,
        servico: filtroServico,
        status: filtroStatus,
      }),
    [data, filtroPropriedade, filtroServico, filtroStatus],
  );

  function limparFiltros() {
    setFiltroPropriedade("");
    setFiltroServico("");
    setFiltroStatus("");
  }

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
        await atualizarSolicitacao(editando.id, payload);
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

  const columns = useMemo(
    () => [
      {
        title: "Propriedade",
        dataIndex: "propriedade",
        key: "propriedade",
        width: 160,
        sorter: (a, b) => a.propriedade.localeCompare(b.propriedade, "pt-BR"),
        render: (_, record) => record.propriedade || "—",
      },
      {
        title: "Contato",
        dataIndex: "nomeContato",
        key: "nomeContato",
        width: 140,
        sorter: (a, b) => a.nomeContato.localeCompare(b.nomeContato, "pt-BR"),
        render: (_, record) => record.nomeContato || "—",
      },
      {
        title: "Telefone",
        dataIndex: "telefone",
        key: "telefone",
        width: 130,
        render: (_, record) => exibirTelefone(record.telefone),
      },
      {
        title: "Cidade",
        dataIndex: "cidade",
        key: "cidade",
        width: 130,
        sorter: (a, b) => (a.cidade || "").localeCompare(b.cidade || "", "pt-BR"),
        render: (_, record) => record.cidade || "—",
      },
      {
        title: "Serviços",
        dataIndex: "servicos",
        key: "servicos",
        width: 180,
        render: (_, record) => renderServicosResumo(record.servicos),
      },
      {
        title: "Área total (ha)",
        dataIndex: "areaTotal",
        key: "areaTotal",
        width: 120,
        sorter: (a, b) => a.areaTotal - b.areaTotal,
        render: (_, record) =>
          Number(record.areaTotal).toLocaleString("pt-BR"),
      },
      {
        title: "Data execução",
        dataIndex: "data",
        key: "data",
        width: 120,
        sorter: (a, b) => parseDataBr(a.data) - parseDataBr(b.data),
        defaultSortOrder: "descend",
        render: (_, record) => record.data || "—",
      },
      {
        title: "Valor estimado",
        dataIndex: "vlrEstimado",
        key: "vlrEstimado",
        width: 130,
        sorter: (a, b) => a.vlrEstimado - b.vlrEstimado,
        render: (_, record) => formatMoeda(record.vlrEstimado),
      },
      {
        title: "Solicitado em",
        dataIndex: "dataSolicitacao",
        key: "dataSolicitacao",
        width: 120,
        sorter: (a, b) =>
          parseDataBr(a.dataSolicitacao) - parseDataBr(b.dataSolicitacao),
        render: (_, record) => record.dataSolicitacao || "—",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 170,
        sorter: (a, b) => a.status.localeCompare(b.status, "pt-BR"),
        render: (_, record) => renderStatus(record.status),
      },
      {
        title: "Observação",
        dataIndex: "observacaoCliente",
        key: "observacaoCliente",
        width: 180,
        ellipsis: true,
        render: (_, record) =>
          record.observacaoCliente ? (
            <Tooltip title={record.observacaoCliente}>
              <Text type="secondary">{record.observacaoCliente}</Text>
            </Tooltip>
          ) : (
            "—"
          ),
      },
      {
        title: "Ações",
        key: "acoes",
        fixed: "right",
        width: 160,
        render: (_, record) => (
          <Space wrap direction="vertical" size="small">
            {record.observacaoCliente && record.podeAprovar && (
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
                  onClick={() => handleAprovar(record.id)}
                >
                  Aprovar
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
                  onConfirm={() => handleExcluir(record.id)}
                >
                  <Button size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              )}
            </Space>
          </Space>
        ),
      },
    ],
    [],
  );

  const expandable = useMemo(
    () => ({
      expandedRowRender: (record) => (
        <Table
          size="small"
          pagination={false}
          columns={colunasServicosExpandido}
          dataSource={record.servicos}
          rowKey={(row, index) => `${record.id}-servico-${index}`}
        />
      ),
      rowExpandable: (record) => record.servicos?.length > 0,
    }),
    [],
  );

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
          <BarraFiltrosGrid
            showCliente={false}
            showServico
            propriedade={filtroPropriedade}
            onPropriedadeChange={setFiltroPropriedade}
            propriedadeOptions={opcoesPropriedade}
            servico={filtroServico}
            onServicoChange={setFiltroServico}
            servicoOptions={opcoesServico}
            status={filtroStatus}
            onStatusChange={setFiltroStatus}
            statusOptions={opcoesStatus}
            statusPlaceholder="Status"
            onLimpar={limparFiltros}
          />
          <GridPadrao
            columns={columns}
            data={dataFiltrada}
            rowKey="id"
            pageSize={10}
            showSizeChanger={false}
            scroll={{ x: 1800 }}
            expandable={expandable}
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
